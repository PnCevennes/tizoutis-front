<template src="./subventions.html" />
<script>
import {Dropdown, Btn} from 'uiv'
import {SERVER} from '@/config'
import {GeneralMixin, AuthMixin} from '@/core/mixins'
import {DynForm} from '@/components/tools/dynform'
import {DynTable, TableController} from '@/components/tools/dyntable'
import {demTable, PetForm, SaForm, SubForm, DecForm, PaiForm} from './config'
import adminForm from './adminform'

/*
Fonctions de vérifications diverses
*/
const chklen = (val) => val && val.length
const chkdte = (val) => val && val !== null
const chkdteexp = (val) => val && new Date(val) < new Date()
const chkval = (val) => parseInt(val * 100) === 0

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
            filterSubs: false,
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
            var totVerse = (
                parseFloat(vals.pai_accpt1_montant) +
                parseFloat(vals.pai_accpt2_montant) +
                parseFloat(vals.pai_accpt3_montant) +
                parseFloat(vals.pai_accpt4_montant) +
                parseFloat(vals.pai_accpt5_montant)
            )
            var mntAnnule = parseFloat(vals.pai_mnt_annule)
            switch (x) {
            case 1:
                totVerse -= vals.pai_accpt1_montant - evt
                break
            case 2:
                totVerse -= vals.pai_accpt2_montant - evt
                break
            case 3:
                totVerse -= vals.pai_accpt3_montant - evt
                break
            case 4:
                totVerse -= vals.pai_accpt4_montant - evt
                break
            case 5:
                totVerse -= vals.pai_accpt5_montant - evt
                break
            case 6:
                mntAnnule = parseFloat(evt)
                break
            }
            vh.$set(vals, 'pai_total_verse', Math.abs(Math.round(totVerse * 100) / 100))
            vh.$set(vals, 'pai_reste_du', Math.round((vals.dec_montant - totVerse - mntAnnule) * 100) / 100)
            this.calcStatut(this.form_content)
        },
        calcStatut (fiche) {
            /*
            Calcule le statut d'une demande
            statuts :
                1 a presenter
                2 en cours
                3 a annuler
                4 clos
            */
            if (fiche.meta_statut === 4) {
                return fiche
            }
            if (chklen(fiche.dec_motif_refus)) {
                fiche.meta_statut = 4
                return fiche
            }
            if (chklen(fiche.dec_motif_ajourn) && !chkdte(fiche.dec_bur_ajourn_date)) {
                fiche.meta_statut = 1
                return fiche
            }
            if (!chkdte(fiche.dec_date_bureau)) {
                fiche.meta_statut = 1
                return fiche
            }
            if (chkval(fiche.pai_reste_du)) {
                fiche.meta_statut = 4
                return fiche
            }
            if (chkdteexp(fiche.dec_echeance)) {
                fiche.meta_statut = 3
                return fiche
            }
            fiche.meta_statut = 2
            return fiche
        },
        getAllCardsClbk (data) {
            return data.map(this.calcStatut)
        },
        getOneCardClbk (data) {
            return new Promise((resolve, reject) => {
                try {
                    var _data = this.calcStatut(data)
                    resolve(_data)
                } catch (e) {
                    reject(e)
                }
            })
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
