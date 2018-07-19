<template>
    <div>
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Informations</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="correspondants.length">
                    <th>Correspondants <span class="badge">{{correspondants.length}}</span></th>
                    <td>
                        <a title="Écrire à tous" class="btn btn-xs btn-primary" :href="'mailto:'+correspondantsMails"><span class="glyphicon glyphicon-envelope"></span></a>
                        <copy-btn id="cp_mail_corresps" css-class="btn btn-xs btn-success" v-model="correspondantsMails" />
                            <a title="Exporter au format CSV (excel, LibreOffice)" :href="getFormated('correspondant', 'csv')" class="btn btn-xs btn-warning"><span class="glyphicon glyphicon-download-alt"></span></a>
                            <a title="Exporter au format VCARD (thunderbird, téléphones)" :href="getFormated('correspondant', 'vcard')" class="btn btn-xs btn-info"><span class="glyphicon glyphicon-phone"></span></a>
                    </td>
                </tr>
                <tr :key="item.id" v-for="item in correspondants" @click="edit(item.id)">
                    <td>{{item.label}}</td>
                    <td>
                        {{item.fonction}}<br />
                        <span v-if="item.telephone"><span class="glyphicon glyphicon-earphone"></span> {{item.telephone | formatTelephone}}</span>
                        <span v-if="item.telephone && item.mobile"> - </span>
                        <span v-if="item.mobile"><span class="glyphicon glyphicon-phone"></span> {{item.mobile | formatTelephone}}</span><br />
                        <a :href="'mailto:'+item.email">{{item.email}}</a></td>
                </tr>
                <tr v-if="communes.length">
                    <th>Communes <span class="badge">{{communes.length}}</span></th>
                    <td>
                        <a class="btn btn-xs btn-primary" :href="'mailto:'+communesMails"><span class="glyphicon glyphicon-envelope"></span></a>
                        <copy-btn id="cp_mail_communes" css-class="btn btn-xs btn-success" v-model="communesMails" />
                        <a :href="getFormated('commune', 'csv')" class="btn btn-xs btn-warning">CSV</a>
                        <a :href="getFormated('commune', 'vcard')" class="btn btn-xs btn-info">VCARD</a>
                    </td>
                </tr>
                <tr :key="item.id" v-for="item in communes" @click="edit(item.id)">
                    <td>{{item.nom}}</td>
                    <td>
                        <span><span class="glyphicon glyphicon-earphone"></span>{{item.telephone | formatTelephone}}</span><br />
                        <a :href="'mailto:'+item.email">{{item.email}}</a>
                    </td>
                </tr>
                <tr v-if="entreprises.length">
                    <th>Entreprises <span class="badge">{{entreprises.length}}</span></th>
                    <td>
                        <a class="btn btn-xs btn-primary" :href="'mailto:'+entreprisesMails"><span class="glyphicon glyphicon-envelope"></span></a>
                        <copy-btn id="cp_mail_entreprises" css-class="btn btn-xs btn-success" v-model="entreprisesMails" />
                        <a :href="getFormated('entreprise', 'csv')" class="btn btn-xs btn-warning">CSV</a>
                        <a :href="getFormated('entreprise', 'vcard')" class="btn btn-xs btn-info">VCARD</a>
                    </td>
                </tr>
                <tr :key="item.id" v-for="item in entreprises" @click="edit(item.id)">
                    <td>{{item.nom}}</td>
                    <td>
                        <span>{{item.telephone | formatTelephone}}</span><br />
                        <a :ref="'mailto:'+item.email">{{item.email}}</a>
                    </td>
                </tr>
                <tr v-if="entites.length">
                    <th colspan="2">
                        Groupes <span class="badge">{{entites.length}}</span>
                    </th>
                </tr>
                <tr :key="item.id" v-for="item in entites">
                    <td colspan="2"><router-link :to="{name: 'annuaire', query: {s: item.id, e: item.id}}">{{item.label}}</router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import copyBtn from '@/components/tools/copybtn'
import {formatTelephone} from '@/commons'
import {URLS} from './config'

export default {
    name: 'listResults',
    components: {
        copyBtn
    },
    props: ['data', 'searchParams'],
    filters: {
        formatTelephone
    },
    computed: {
        correspondants () {
            return this.data.filter(x => x.type_entite === 'correspondant')
        },
        communes () {
            return this.data.filter(x => x.type_entite === 'commune')
        },
        entites () {
            return this.data.filter(x => x.type_entite === 'entite')
        },
        entreprises () {
            return this.data.filter(x => x.type_entite === 'entreprise')
        },
        correspondantsMails () {
            var mails = this.correspondants.map(x => `${x.label} <${x.email}>`)
            return mails.join(',')
        },
        communesMails () {
            var mails = this.communes.map(x => `${x.label} <${x.email}>`)
            return mails.join(',')
        },
        entreprisesMails () {
            var mails = this.entreprises.map(x => `${x.label} <${x.email}>`)
            return mails.join(',')
        }
    },
    methods: {
        getSearchParams (query) {
            var qr = typeof (query) === 'object' ? query : [query]
            var params = new URLSearchParams()
            qr.forEach(x => { params.append('params', x) })
            return params
        },
        getFormated (type, format) {
            var params = this.getSearchParams(this.searchParams)
            params.append('type', type)
            params.append('format', format)
            return URLS.entites + params.toString()
        },
        edit (id) {
            this.$emit('select', id)
        }
    }
}
</script>
