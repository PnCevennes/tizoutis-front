<template>
    <div>
        <h1 class="titlebar">Travaux sur bâtiments</h1>
        <div class="general-content">
            <div class="main-list">
                <div class="dynform recherche">
                    <input
                        type="number"
                        @input="changeYear"
                        v-model="listYear" />
                </div>
                <div class="dynform dynform-inline">
                    <label><input type="checkbox" @input="hide_finished($event)" /> Masquer les demandes terminées</label>
                    <div class="separator"></div>
                    <a class="btn btn-success btn-xs" :href="csvUrl">Export CSV</a>
                </div>
                <div>
                    <dyn-table :controller="demTableCtrl" @select="select" />
                </div>
            </div>
            <div class="side-form">
                <div class="dynform right-align">
                    <button type="button" @click="new_fiche">Nouvelle demande de travaux</button>
                </div>
                <div>
                    <dyn-form :config="formCtrl" v-model="form_content" @commit="save($event)" @remove="remove($event)" @commune-changed="communeChange($event)" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {SERVER} from '@/config'
import {DynForm} from '@/components/tools/dynform'
import {DynTable, TableController} from '@/components/tools/dyntable'
import {demTable, reqForm, planForm, reaForm, refGeo} from './config'
import {GeneralMixin, AuthMixin} from '@/modules/mixins'

export default {
    name: 'fiche',
    components: {
        DynTable,
        DynForm
    },
    mixins: [GeneralMixin, AuthMixin],
    props: {
        query: {
            default: null
        }
    },
    data () {
        return {
            groupAdmin: 'tizoutis-travaux-batiments-admin',
            groupAccept: ['tizoutis-travaux-batiments-admin', 'tizoutis-travaux-batiments-user'],
            routeName: 'batiments',
            ressourceUrl: 'travaux_batiments',
            demTableCtrl: new TableController(demTable),
            userForm: [reqForm, planForm, reaForm],
            csvUrl: [SERVER, 'travaux_batiments', '?format=csv'].join('/'),
            refGeo
        }
    },
    methods: {
        getOneCard (fiche) {
            // charge le détail d'une fiche
            axios.get(SERVER + '/travaux_batiments/' + fiche).then(res => {
                this.refGeo.getBatiments(res.data.dem_commune, reqForm, 'dem_designation')
                this.demTableCtrl.selected_id = fiche
                setTimeout(() => {
                    this.form_content = res.data
                    window.scrollTo({top: 0})
                }, 10)
            }).catch(() => {
                this.form_content = {}
            })
        },
        communeChange (evt) {
            this.refGeo.getBatiments(evt, reqForm, 'dem_designation')
        },
        hide_finished (evt) {
            this.hideFinished = evt.target.checked
            if (evt.target.checked) {
                this.demTableCtrl.filterData['rea_date'] = true
                this.demTableCtrl.filters['rea_date'] = (v) => {
                    return v === null
                }
            } else {
                this.demTableCtrl.filterData['rea_date'] = false
                this.demTableCtrl.filters['rea_date'] = (v) => v
            }
            this.demTableCtrl.update()
            if (this.form_content.id) {
                var res = this.demTableCtrl.search('id', this.form_content.id)
                this.demTableCtrl.select(res, true)
            }
        }
    }
}
</script>
