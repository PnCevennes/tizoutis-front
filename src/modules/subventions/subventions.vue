<template>
    <div>
        <h1 class="titlebar">Subventions</h1>
        <button v-if="userIsAdmin" type="button" class="btn btn-primary" @click="toggle_gestion">Gérer</button>
        <div v-if="gestion">
            <admin-form>
            </admin-form>
        </div>
        <div v-else class="general-content">
            <div class="main-list">
                <div class="dynform dynform-inline">
                    <a class="btn btn-success btn-xs" :href="csvUrl">Export CSV</a>
                </div>
                <hr />
                <div>
                    <dyn-table :controller="demTableCtrl" @select="select" />
                </div>
            </div>
            <div class="side-form">
                <div class="dynform right-align">
                    <button type="button" @click="newCard">Nouvelle fiche</button>
                    <dropdown append-to-body v-if="form_content.id">
                        <btn class="dropdown-toggle">Documents<span class="caret"></span></btn>
                        <template slot="dropdown">
                            <li v-for="item in publicTemplates" :key="item.id"><a role="button" :href="template(item.name)">{{item.label}}</a></li>
                        </template>
                    </dropdown>
                    <dropdown append-to-body v-if="form_content.id && userIsAdmin">
                        <btn class="dropdown-toggle">Docs admin<span class="caret"></span></btn>
                        <template slot="dropdown">
                            <li v-for="item in adminTemplates" :key="item.id"><a role="button" :href="template(item.name)">{{item.label}}</a></li>
                        </template>
                    </dropdown>
                </div>
                <div>
                    <dyn-form
                        ref="subvForm"
                        :config="formCtrl"
                        v-model="form_content"
                        @commit="save($event)"
                        @remove="remove($event)"
                        @calctauxtotal="calcTauxSub(1, $event)"
                        @calctauxmontant="calcTauxSub(2, $event)"
                        @calctauxattrib="calcTauxAttr($event)"
                        @accpt1="calcReste(1, $event)"
                        @accpt2="calcReste(2, $event)"
                        @accpt3="calcReste(3, $event)"
                        @accpt4="calcReste(4, $event)"
                        @accpt5="calcReste(5, $event)"
                        />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {Dropdown, Btn} from 'uiv'
import {SERVER} from '@/config'
import {GeneralMixin, AuthMixin} from '@/core/mixins'
import {DynForm} from '@/components/tools/dynform'
import {DynTable, TableController} from '@/components/tools/dyntable'
import {demTable, PetForm, SaForm, SubForm, DecForm, PaiForm} from './config'
import adminForm from './adminform'

export default {
    name: 'subventions',
    components: {
        adminForm,
        DynTable,
        DynForm,
        Dropdown,
        Btn
    },
    mixins: [AuthMixin, GeneralMixin],
    props: {
        query: {
            default: null
        }
    },
    data () {
        return {
            gestion: false,
            templates: [],
            groupAdmin: 'tizoutis-subventions',
            routeName: 'subventions',
            ressourceUrl: 'subventions',
            demTableCtrl: new TableController(demTable),
            userForm: [PetForm, SaForm, SubForm, DecForm, PaiForm]
        }
    },
    computed: {
        publicTemplates () {
            return this.templates.filter(x => x.public)
        },
        adminTemplates () {
            return this.templates.filter(x => !x.public)
        }
    },
    methods: {
        toggle_gestion () {
            this.gestion = !this.gestion
        },
        template (tname) {
            return [SERVER, this.ressourceUrl, this.$props.query.fiche].join('/') + '?format=document&template=' + tname
        },
        calcTauxSub (x, evt) {
            /*
            Calcule le taux de sub en fonction des couts totaux et somme accordée
            */
            var vh = this.$refs.subvForm
            if (x === 1) {
                vh.$set(vh.values, 'sub_taux', Math.round((vh.values.sub_montant / evt) * 10000) / 100)
            } else {
                vh.$set(vh.values, 'sub_taux', Math.round((evt / vh.values.sub_cout_total) * 10000) / 100)
            }
        },
        calcTauxAttr (evt) {
            var vh = this.$refs.subvForm
            vh.$set(vh.values, 'dec_taux', Math.round((evt / vh.values.sub_cout_total) * 10000) / 100)
            vh.$set(vh.values, 'pai_reste_du', evt)
        },
        calcReste (x, evt) {
            /*
            Calcule le reste à payer
            */
            var vh = this.$refs.subvForm
            var vals = vh.values
            var out
            switch (x) {
            case 1:
                out = vals.sub_montant - evt - vals.pai_accpt2_montant - vals.pai_accpt3_montant - vals.pai_accpt4_montant - vals.pai_accpt5_montant
                break
            case 2:
                out = vals.sub_montant - vals.pai_accpt1_montant - evt - vals.pai_accpt3_montant - vals.pai_accpt4_montant - vals.pai_accpt5_montant
                break
            case 3:
                out = vals.sub_montant - evt - vals.pai_accpt1_montant - vals.pai_accpt2_montant - vals.pai_accpt4_montant - vals.pai_accpt5_montant
                break
            case 4:
                out = vals.sub_montant - evt - vals.pai_accpt1_montant - vals.pai_accpt2_montant - vals.pai_accpt3_montant - vals.pai_accpt5_montant
                break
            case 5:
                out = vals.sub_montant - evt - vals.pai_accpt1_montant - vals.pai_accpt2_montant - vals.pai_accpt3_montant - vals.pai_accpt4_montant
                break
            }
            vh.$set(vals, 'pai_reste_du', out)
        },
        calcStatut (fiche) {
            /*
            Calcule le statut d'une demande
            */
            var out = 1
            if (fiche.dec_date_notif && fiche.dec_date_notif !== null) {
                out = 2
            }
            if (fiche.dec_echeance && new Date(fiche.dec_echeance) < new Date()) {
                out = 3
            }
            if (fiche.pai_reste_du === 0) {
                out = 4
            }
            fiche.meta_statut = out
            return fiche
        },
        getAllCardsClbk (data) {
            return data.map(this.calcStatut)
        },
        getOneCardClbk (data) {
            return this.calcStatut(data)
        }
    },
    mounted () {
        PetForm.fields.filter(x => x.name === 'meta_createur')[0].default = this.user.name
        PetForm.fields.filter(x => x.name === 'meta_createur_mail')[0].default = this.user.mail
        this.httpInstance.get('/subventions/templates').then(resp => {
            this.templates = resp.data
        }).catch(() => {
            // TODO
            this.templates = []
        })
    }
}
</script>
