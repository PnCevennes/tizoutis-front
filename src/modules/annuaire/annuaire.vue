<template>
    <div>
        <h1 class="titlebar">Annuaire</h1>
        <div class="container-fluid">
            <div class="row recherche dynform">
                <recherche v-model="params_recherche" :url="URLS['recherche']" />
                <btn type="success" size="xs" class="pull-right" @click="search">Go !</btn>
            </div>
            <div class="row">
                <div>
                    <editeur :data="current" @close="close" @save="save($event)" @remove="remove($event)" @editing="switch_editing" />
                </div>
                <div class="main-list" v-if="results.length">
                    <list-results :data="results" :search-params="query.s" @select="edit($event)" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {Notification, MessageBox, Btn} from 'uiv'
import recherche from '@/components/tools/recherche'
import listResults from './listresults'
import editeur from './editeur'
import {URLS} from './config'

export default {
    name: 'annuaire',
    components: {
        Notification,
        MessageBox,
        Btn,
        recherche,
        listResults,
        editeur
    },
    props: {
        query: { default: null }
    },
    data () {
        return {
            URLS,
            params_recherche: [''],
            current: '',
            results: [],
            prevSearch: '',
            editing: false,
            allSearchResults: []
        }
    },
    computed: {
        urlParams () {
            var params = new URLSearchParams()
            this.params_recherche.forEach(x => { params.append('params', x.id) })
            return params
        },
        user () {
            return this.$store.state.user
        }
    },
    methods: {
        save (data) {
            if (!data.id) {
                axios.post(this.URLS.save, data).then(
                    res => {
                        Notification.notify({
                            content: 'Données enregistrées',
                            placement: 'top-right',
                            type: 'success'})
                        this.$router.push({
                            name: 'annuaire',
                            query: {
                                s: JSON.parse(this.prevSearch),
                                e: res.data.id
                            }
                        })
                    }
                ).catch(
                    () => {
                        Notification.notify({
                            content: 'Erreur d\'enregistrement',
                            placement: 'top-right',
                            type: 'danger'})
                    }
                )
            } else {
                axios.put(this.URLS.save + '/' + data.id, data).then(
                    res => {
                        Notification.notify({
                            content: 'Données enregistrées',
                            placement: 'top-right',
                            type: 'success'})
                        this.init_page(JSON.parse(this.prevSearch), data.id, true)
                    }
                ).catch(
                    () => {
                        Notification.notify({
                            content: 'Erreur d\'enregistrement',
                            placement: 'top-right',
                            type: 'danger'})
                    }
                )
            }
        },
        remove (data) {
            MessageBox.confirm({
                title: "Suppression d'une fiche",
                content: 'Êtes vous certain de vouloir supprimer cette fiche ?'
            }).then(() => {
                axios.delete(this.URLS.save + '/' + data.id).then((res) => {
                    Notification.notify({
                        content: 'Fiche supprimée',
                        placement: 'top-right',
                        type: 'success'})
                    this.init_page(JSON.parse(this.prevSearch), null, true)
                }).catch((err) => {
                    console.error(err)
                })
            }).catch(() => {
                Notification.notify({
                    content: 'Suppression annulée',
                    placement: 'top-right',
                    type: 'info'})
            })
        },
        close () {
            this.current = {}
            this.editing = false
            this.$router.push({ name: 'annuaire', query: { s: this.query.s } })
        },
        switch_editing () {
            this.editing = true
        },
        getSearchParams (query) {
            var qr = typeof (query) === 'object' ? query : [query]
            var params = new URLSearchParams()
            qr.forEach(x => { params.append('params', x) })
            return params
        },
        init_page (query, idEdit, reload) {
            this.current = {}
            if (query !== null && query !== undefined) {
                if (typeof (query) === 'string') {
                    query = [parseInt(query)]
                }
                if (!!reload || JSON.stringify(query) !== this.prevSearch) {
                    this.prevSearch = JSON.stringify(query)
                    axios.get(URLS['labels'] + this.getSearchParams(query)).then(
                        res => {
                            this.params_recherche = res.data
                            this.get_xhr(idEdit * 1)
                        }
                    ).catch(
                        err => { Notification.notify('erreur ! ' + err.msg) }
                    )
                } else {
                    if (idEdit) {
                        this.extract(idEdit * 1)
                    }
                }
            } else {
                this.params_recherche = ['']
                this.searchResults = {
                    correspondants: [],
                    communes: [],
                    entites: [],
                    entreprises: []
                }
            }
        },
        get_xhr (idEdit) {
            axios.get(URLS['entites'] + this.urlParams).then(
                res => {
                    this.results = res.data
                    this.extract(idEdit)
                    Notification.notify({
                        content: 'Données reçues',
                        placement: 'top-right',
                        type: 'success'})
                }
            ).catch(
                err => { this.searchResults = err.data }
            )
        },
        extract (idEdit) {
            if (idEdit !== undefined) {
                var current = this.results.filter(x => x.id === idEdit)
                if (current.length) {
                    this.current = current[0]
                    this.$emit('show', this.current)
                }
            }
        },
        search () {
            this.$router.push({ name: 'annuaire', query: { s: this.params_recherche.map(x => x.id) } })
        },
        edit (id) {
            if (id === this.query.e) {
            } else {
                this.$router.push({
                    name: 'annuaire',
                    query: {
                        s: this.params_recherche.map(x => x.id),
                        e: id
                    }
                })
            }
        }
    },
    mounted () {
        this.init_page(this.query.s, this.query.e)
    },
    beforeRouteUpdate (to, from, next) {
        this.init_page(to.query.s, to.query.e)
        next()
    }
}
</script>
