import axios from 'axios'
import {Notification, MessageBox} from 'uiv'
import {FormController} from '@/components/tools/dynform'
import {SERVER, DEBUG} from '@/config'

export default {
    data () {
        return {
            listYear: '',
            groupAccept: ['*'],
            hideFinished: false,
            form_content: {},
            formCtrl: new FormController(),
            prev_hidden: true
        }
    },
    filters: {
        datefr (dte) {
            if (dte !== 'None') {
                return dte.split('-').reverse().join('/')
            }
            return ''
        }
    },
    computed: {
        user () {
            return this.$store.state.user
        },
        userIsAdmin () {
            return this.$store.getters.isMember(this.groupAdmin)
        },
        full_form () {
            return this.user ? this.userIsAdmin && this.form_content.id !== undefined : false
        },
        httpInstance () {
            return axios.create({
                baseURL: SERVER,
                headers: {token: this.$store.state.userToken}
            })
        },
        ressource () {
            return this.ressourceUrl.endsWith('/') ? this.ressourceUrl : this.ressourceUrl + '/'
        },
        csvUrl () {
            return [
                SERVER,
                this.ressourceUrl,
                '?format=csv' +
                '&annee=' + this.listYear +
                '&add_prev_years=' + !this.prev_hidden +
                '&token=' + this.$store.state.userToken
            ].join('/')
        }
    },
    methods: {
        getAllCards (year) {
            /*
             * charge la liste des fiches créées dans l'année
             */
            this.$store.commit('loadingData')
            this.httpInstance.get(
                this.ressource,
                {
                    params: {annee: year}
                }
            ).then(res => {
                var results
                if (this.getAllCardsClbk !== undefined) {
                    results = this.getAllCardsClbk(res.data)
                } else {
                    results = res.data
                }
                this.demTableCtrl.setData(results)
                this.$store.commit('dataLoaded')
                window.scrollTo({top: 0})
            }).catch(() => {})
        },
        getOldCards () {
            /*
            charge la liste des fiches non fermées au début de l'année
            */
            this.$store.commit('loadingData')
            this.httpInstance.get(this.ressource, {params: {
                annee: this.listYear,
                add_prev_years: true
            }}).then(res => {
                var results
                if (this.getOldCardsClbk !== undefined) {
                    results = this.getOldCardsClbk(res.data)
                } else if (this.getAllCardsClbk !== undefined) {
                    results = this.getAllCardsClbk(res.data)
                } else {
                    results = res.data
                }
                this.demTableCtrl.setData(results)
                this.$store.commit('dataLoaded')
                window.scrollTo({top: 0})
            }).catch(() => {})
        },
        getOneCard (intervention) {
            /*
             * charge le détail d'une fiche
             */
            this.$store.commit('loadingData')
            var ressource = this.ressource + intervention

            this.httpInstance.get(ressource).then(res => {
                var results
                if (this.getOneCardClbk !== undefined) {
                    results = this.getOneCardClbk(res.data)
                } else {
                    results = res.data
                }
                this.demTableCtrl.selected_id = intervention
                this.form_content = results
                this.$store.commit('dataLoaded')
                window.scrollTo({top: 0})
            }).catch(() => {
                this.form_content = {}
            })
        },
        save (data) {
            /*
             * Envoie une fiche pour enregistrement
             */
            this.$store.commit('savingData')
            var ressource = data.id !== undefined ? this.ressource + data.id : this.ressource

            this.httpInstance.post(
                ressource,
                data
            ).then(res => {
                Notification.notify({
                    content: 'Fiche enregistrée',
                    placement: 'top-right',
                    type: 'success'
                })
                this.$store.commit('dataSaved')
                this.getAllCards(this.listYear)
                this.getOneCard(res.data.id)
            }).catch(() => {
                this.$store.commit('dataSaved')
                Notification.notify({
                    content: 'Une erreur est survenue !',
                    placement: 'top-right',
                    type: 'danger'
                })
            })
        },
        remove (data) {
            /*
             * Affiche un message de confirmation avant une suppression
             */
            MessageBox.confirm({
                title: "Suppression d'une fiche",
                content: 'Êtes vous certain de vouloir supprimer cette fiche ?'
            }).then(() => {
                this._remove(data)
            }).catch(() => {
                Notification.notify({
                    content: 'Suppression annulée',
                    placement: 'top-right',
                    type: 'info'})
            })
        },
        _remove (data) {
            /*
             * Supprime une fiche
             */
            this.$store.commit('savingData')
            var ressource = this.ressource + data.id

            this.httpInstance.delete(ressource).then(() => {
                this.$store.commit('dataSaved')
                Notification.notify({
                    content: 'Fiche supprimée !',
                    placement: 'top-right',
                    type: 'success'
                })
                this.getAllCards(this.listYear)
                this.form_content = {}
            }).catch(() => {
                Notification.notify({
                    content: 'Une erreur est survenue !',
                    placement: 'top-right',
                    type: 'danger'
                })
            })
        },
        newCard () {
            this.$router.push({
                name: this.routeName,
                query: {
                    annee: this.listYear
                }
            })
        },
        select (item) {
            this.$router.push({
                name: this.routeName,
                query: {
                    annee: this.listYear,
                    fiche: item.id
                }
            })
        },
        changeYear () {
            this.$router.push({
                name: this.routeName,
                query: {
                    annee: this.listYear
                }
            })
        },
        hide_prev (evt) {
            if (evt.target.checked) {
                this.getAllCards(this.listYear)
            } else {
                this.getOldCards()
            }
        },
        init () {
            if (this.prev_hidden) {
                this.getAllCards(this.listYear)
            } else {
                this.getOldCards()
            }
            if (this.query.fiche) {
                this.getOneCard(this.query.fiche)
                this.formCtrl.show_buttons = this.formCtrl.user_is_admin = this.userIsAdmin
            } else {
                this.form_content = {}
                this.formCtrl.show_buttons = true
            }
        }
    },
    mounted () {
        this.listYear = this.query.annee === undefined ? new Date().getFullYear() : this.query.annee
        this.formCtrl = new FormController(this.userForm, this.user)
        this.formCtrl.user_is_admin = this.userIsAdmin
        this.formCtrl.DEBUG = DEBUG
        this.$store.commit('setRoute', this.$router.currentRoute)
        if (!this.$store.getters.isAuth) {
            setTimeout(() => {
                if (!this.user.name || this.user.name === '') {
                    this.$router.push({name: 'login'})
                }
            }, 200)
        }
        this.init()
    },
    beforeRouteUpdate (to, from, next) {
        this.listYear = (to.query.annee === undefined || to.query.annee === null) ? new Date().getFullYear() : to.query.annee
        this.formCtrl.DEBUG = DEBUG
        if (to.query.fiche !== undefined) {
            this.getOneCard(to.query.fiche)
            this.demTableCtrl.selected_id = to.query.fiche
            this.formCtrl.show_buttons = this.formCtrl.user_is_admin = this.userIsAdmin
        } else {
            this.form_content = {}
            this.demTableCtrl.selected_id = null
            this.formCtrl.show_buttons = true
            this.demTableCtrl.update()
        }
        if (to.query.annee !== from.query.annee) {
            // this.getAllCards(to.query.annee)
            this.init()
        }
        if (this._routeUpdatedClbk !== undefined) {
            this._routeUpdatedClbk(to, from)
        }
        next()
    }
}
