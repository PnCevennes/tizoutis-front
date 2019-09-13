<template>
    <div>
        <h1 class="titlebar">Annuaire</h1>
        <div class="container-fluid">
            <div class="row recherche dynform">
                <recherche v-model="searchParams" :url="searchUrl" :format="formatListClbk" />
                <btn
                    :disabled="!searchInputValid"
                    type="success"
                    size="xs"
                    class="pull-right"
                    @click="search">Go !</btn>
            </div>
            <div class="row">
            <div class="search-results" v-if="results.recherche.length">
                <div class="search-res">
                    <resultlist :ltitle="'Éléments recherchés'" v-model="results.recherche" />
                </div>
                <div class="search-lst">
                    <resultlist :ltitle="'Éléments liés'" v-model="results.liste" />
                </div>
            </div>
            <div class="search-results" v-else-if="userIsAdmin">
                <div class="search-res btn-group">
                    <div>
                        <button type="button" class="btn btn-primary" @click="addNew('entite')">Nouveau groupe</button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary" @click="addNew('correspondant')">Nouveau correspondant</button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary" @click="addNew('entreprise')">Nouvelle entreprise</button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary" @click="addNew('commune')">Nouvelle commune</button>
                    </div>
                </div>
                <div class="search-lst">
                    <ann-form ref="addform" />
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {Notification, Btn} from 'uiv'
import recherche from '@/components/tools/recherche'
import {AuthMixin} from '@/core/mixins'
import resultlist from './resultlist'
import {SERVER} from '@/config'
import annForm from './resultcard/forms/annForm'

export default {
    name: 'annuaire',
    components: {
        Notification,
        Btn,
        recherche,
        resultlist,
        annForm
    },
    props: {
        query: { default: null }
    },
    mixins: [AuthMixin],
    data () {
        return {
            groupAccept: ['*'],
            searchParams: [''],
            results: {recherche: [], liste: []}
        }
    },
    computed: {
        userIsAdmin () {
            return this.$store.getters.isMember(['tizoutis-annuaire'])
        },
        httpInstance () {
            return axios.create({
                baseURL: SERVER,
                headers: {token: this.$store.state.userToken}
            })
        },
        searchUrl () {
            return SERVER + '/annuaire/entites/'
        },
        searchCount () {
            return this.searchParams[0] && this.searchParams[0].id !== undefined
        }
    },
    methods: {
        addNew (type) {
            this.$refs.addform.setForm(type)
        },
        formatListClbk (item) {
            if (item.fonction) {
                return '<b>' + item.label + '</b> <small>(' + item.fonction + ')</small>'
            } else {
                return '<b>' + item.label + '</b>'
            }
        },
        searchInputValid () {
            return this.searchParams.every(x => typeof (x) === 'object')
        },
        search () {
            this.$router.push({ name: 'annuaire', query: { s: this.searchParams.map(x => x.id) } })
        },
        getSearchParams (query) {
            var qr = typeof (query) === 'object' ? query : [query]
            var params = new URLSearchParams()
            qr.forEach(x => { params.append('params', x) })
            return params
        },
        getList (search) {
            // entites: SERVER + '/annuaire/entites?',
            var sparams = this.getSearchParams(search)
            this.httpInstance.get('/annuaire/entites?' + sparams).then(
                resp => {
                    this.results = resp.data
                }
            ).catch(err => { console.log(err) })
            this.httpInstance.get('/annuaire/lib_entites/?' + sparams).then(
                resp => {
                    this.searchParams = resp.data
                }
            ).catch(err => { console.log(err) })
        }
    },
    mounted () {
        console.log('mounted')
        console.log(this.query.s)
        if (this.query.s && this.query.s !== undefined) {
            this.getList(this.query.s)
        }
    },
    beforeRouteUpdate (to, from, next) {
        console.log('beforeRouteUpdate')
        console.log(to.query.s)
        if (to.query.s && to.query.s !== undefined) {
            this.getList(to.query.s)
        } else {
            this.results = {recherche: [], liste: []}
            this.searchParams = ['']
        }
        next()
    }
}
</script>
<style scoped>
.search-results {
    width: 100%;
    display: flex;
}
.search-res {
    flex: 1;
}
.search-lst {
    flex: 2;
}
.btn-group>div {
    margin-top: 5px;
}

.btn-group button {
    width: 100%;
}
</style>
