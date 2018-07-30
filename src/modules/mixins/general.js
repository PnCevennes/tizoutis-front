import axios from 'axios'
import {Notification, MessageBox} from 'uiv'
import {FormController} from '@/components/tools/dynform'
import {SERVER} from '@/config'

export default {
    data () {
        return {
            listYear: '',
            hideFinished: false,
            form_content: {},
            formCtrl: new FormController()
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
        }
    },
    methods: {
        getAllCards (year) {
            this.$store.commit('loadingData')
            axios.get([SERVER, this.ressourceUrl, '?annee=' + year].join('/')).then(res => {
                this.demTableCtrl.setData(res.data)
                this.$store.commit('dataLoaded')
                window.scrollTo({top: 0})
            }).catch(() => {})
        },
        getOneCard (intervention) {
            // charge le détail d'une intervention
            this.$store.commit('loadingData')
            axios.get([SERVER, this.ressourceUrl, intervention].join('/')).then(res => {
                this.demTableCtrl.selected_id = intervention
                this.form_content = res.data
                this.$store.commit('dataLoaded')
                window.scrollTo({top: 0})
            }).catch(() => {
                this.form_content = {}
            })
        },
        save (data) {
            var theUrl = data.id !== undefined ? [SERVER, this.ressourceUrl, data.id] : [SERVER, this.ressourceUrl, '']
            this.$store.commit('savingData')
            axios.post(theUrl.join('/'), data).then(res => {
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
            // supprime une intervention
            this.$store.commit('savingData')
            axios.delete([SERVER, this.ressourceUrl, data.id].join('/')).then(() => {
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
        new_fiche () {
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
        init () {
            this.getAllCards(this.listYear)
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
        this.formCtrl.user_is_admin = this.userIsAdmin
        this.listYear = this.query.annee === undefined ? new Date().getFullYear() : this.query.annee
        this.formCtrl = new FormController(this.userForm, this.user)
        if (this.groupAccept) {
            if (!this.$store.getters.isMember(this.groupAccept)) {
                MessageBox.alert({
                    title: 'Alerte intrusion !',
                    content: "Vous n'avez pas les droits nécéssaires pour visiter cette section !"
                }, () => {
                    this.$router.push({name: 'login'})
                })
            } else {
                this.init()
            }
        } else {
            this.init()
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.listYear = (to.query.annee === undefined || to.query.annee === null) ? new Date().getFullYear() : to.query.annee
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
            this.getAllCards(to.query.annee)
        }
        if (this._routeUdatedClbk !== undefined) {
            this._routeUdatedClbk(to, from)
        }
        next()
    }
}
