<template>
    <div>
        <h1 class="titlebar">Annuaire</h1>
        <div class="container-fluid">
            <div class="row recherche dynform">
                <recherche v-model="searchParams" :url="URLS['recherche']" :format="formatListClbk" />
                <btn
                    :disabled="!searchInputValid"
                    type="success"
                    size="xs"
                    class="pull-right"
                    @click="search">Go !</btn>
            </div>
            <div class="row">
                <div>
                    <editeur :data="current" @close="close" @save="save($event)" @remove="remove($event)" @editing="switch_editing" />
                </div>
                <div class="col-lg-10 col-lg-offset-1">
                    <div class="main-list" v-if="query.s">
                        <list-results :data="results" :search-params="query.s" @select="edit($event)" />
                    </div>
                    <information v-else />
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
import information from './informations'
import editeur from './editeur'
import {URLS} from './config'
import {AuthMixin} from '@/core/mixins'

export default {
    name: 'annuaire',
    components: {
        Notification,
        MessageBox,
        Btn,
        recherche,
        listResults,
        information,
        editeur
    },
    props: {
        query: { default: null }
    },
    mixins: [AuthMixin],
    data () {
        return {
            groupAccept: ['*'],
            URLS,
            searchParams: [''],
            current: '',
            results: [],
            prevSearch: '',
            editing: false,
            searchResults: {
                correspondants: [],
                communes: [],
                entites: [],
                entreprises: []
            }
        }
    },
    computed: {
        searchInputValid () {
            return this.searchParams.every(x => typeof (x) === 'object')
        },
        urlParams () {
            var params = new URLSearchParams()
            this.searchParams.forEach(x => { params.append('params', x.id) })
            return params
        },
        user () {
            return this.$store.state.user
        }
    },
    methods: {
        formatListClbk (item) {
            if (item.fonction) {
                return '<b>' + item.label + '</b> <small>(' + item.fonction + ')</small>'
            } else {
                return '<b>' + item.label + '</b>'
            }
        },
        save (data) {
            if (!data.id) {
                axios.post(this.URLS.save + '?token=' + this.$store.state.userToken, data).then(
                    res => {
                        Notification.notify({
                            content: 'Données enregistrées',
                            placement: 'top-right',
                            type: 'success'})
                        this.init_page(JSON.parse(this.prevSearch), res.data.id, true)
                        /*
                            this.$router.push({
                            name: 'annuaire',
                            query: {
                                s: JSON.parse(this.prevSearch),
                                e: res.data.id
                            }
                        })
                        */
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
                axios.put(this.URLS.save + '/' + data.id + '?token=' + this.$store.state.userToken, data).then(
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
                axios.delete(this.URLS.save + '/' + data.id + '?token=' + this.$store.state.userToken).then((res) => {
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
            var token = this.$store.state.userToken
            this.current = {}
            if (query !== null && query !== undefined) {
                if (typeof (query) === 'string') {
                    query = [parseInt(query)]
                }
                if (!!reload || JSON.stringify(query) !== this.prevSearch) {
                    this.prevSearch = JSON.stringify(query)
                    axios.get(URLS['labels'] + this.getSearchParams(query) + '&token=' + token).then(
                        res => {
                            this.searchParams = res.data
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
                this.searchParams = ['']
                this.searchResults = {
                    correspondants: [],
                    communes: [],
                    entites: [],
                    entreprises: []
                }
            }
        },
        get_xhr (idEdit) {
            var token = this.$store.state.userToken
            this.$store.commit('loadingData')
            axios.get(URLS['entites'] + this.urlParams + '&token=' + token).then(
                res => {
                    this.results = res.data
                    this.extract(idEdit)
                    this.$store.commit('dataLoaded')
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
            this.$router.push({ name: 'annuaire', query: { s: this.searchParams.map(x => x.id) } })
        },
        edit (id) {
            if (id === this.query.e) {
            } else {
                this.$router.push({
                    name: 'annuaire',
                    query: {
                        s: this.searchParams.map(x => x.id),
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
