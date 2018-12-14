<template>
    <div>
        <h1 class="titlebar">Recrutement</h1>
        <div class="general-content">
            <div class="main-list">
                <div class="dynform recherche">
                    <input
                        type="number"
                        @input="changeYear"
                        v-model="listYear" />
                </div>
                <div>
                    <dyn-table :controller="demTableCtrl" @select="select" />
                </div>
            </div>
            <div class="side-form">
                <div class="dynform right-align">
                    <button type="button" @click="newCard">Nouvelle fiche</button>
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
import {demTable, headForm, reqForm} from './config'
import {GeneralMixin, AuthMixin} from '@/core/mixins'

export default {
    name: 'recrutement',
    components: {
        DynTable,
        DynForm
    },
    mixins: [AuthMixin, GeneralMixin],
    props: {
        query: {
            default: null
        }
    },
    data () {
        return {
            groupAdmin: 'tizoutis-recrutement',
            routeName: 'recrutement',
            ressourceUrl: 'recrutement',
            demTableCtrl: new TableController(demTable),
            userForm: [headForm, reqForm]
        }
    },
    methods: {
        _routeUpdatedClbk (to, from) {
            this.formCtrl.show_buttons = true
        }
    },
    mounted () {
        var metaCreateurFiche = headForm.fields.filter(x => x.name === 'meta_createur_fiche')[0]
        var notifList = headForm.fields.filter(x => x.name === 'notif_list')[0]
        metaCreateurFiche.default = this.user.name
        notifList.default = [this.user.mail]
    }
}
</script>
