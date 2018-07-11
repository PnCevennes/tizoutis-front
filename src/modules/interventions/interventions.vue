<template>
    <div>
        <h1 class="titlebar">Interventions</h1>
        <div class="general-content">
            <div class="main-list">
                <div class="dynform recherche">
                    <input
                        type="number"
                        @input="changeYear"
                        v-model="listYear" />
                </div>
                <div class="dynform dynform-inline">
                    <label><input type="checkbox" @input="hide_finished($event)" /> Masquer les interventions terminées</label>
                </div>
                <div>
                    <dyn-table :controller="demTableCtrl" @select="select" />
                </div>
            </div>
            <div class="side-form">
                <div class="dynform right-align">
                    <button type="button" @click="new_fiche">Nouvelle intervention</button>
                </div>
                <div>
                    <dyn-form :config="formCtrl" v-model="form_content" @commit="save($event)" @remove="remove($event)" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {DynForm} from '@/components/tools/dynform'
import {DynTable, TableController} from '@/components/tools/dyntable'
import {demTable, reqForm, planForm, reaForm} from './config'
import {GeneralMixin} from '@/modules/mixins'

export default {
    name: 'interventions',
    components: {
        DynTable,
        DynForm
    },
    mixins: [GeneralMixin],
    props: {
        query: {
            default: null
        }
    },
    data () {
        return {
            groupAdmin: 'tizoutis-interventions',
            routeName: 'interventions',
            ressourceUrl: 'interventions',
            demTableCtrl: new TableController(demTable),
            userForm: [reqForm],
            adminForm: [reqForm, planForm, reaForm]
        }
    },
    methods: {
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
