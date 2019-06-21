import {SERVER} from '@/config'
import {Thesaurus, datefr} from '@/components/tools'
/*
import {Validators} from '@/components/tools/dynform'
*/
var thesaurus = new Thesaurus()

// meta + petitionnaire
var PetForm = {
    label: 'Pétitionnaire',
    readonly: true,
    fields: [
        {
            name: 'meta_createur',
            label: 'Créateur de la fiche',
            type: 'line',
            readonly: true
        },
        {
            name: 'meta_createur_mail',
            label: 'Adresse mail',
            type: 'line',
            readonly: true
        },
        {
            name: 'meta_id',
            label: 'Numéro de subvention',
            type: 'line',
            readonly: true
        },
        {
            name: 'meta_statut',
            label: 'Statut',
            type: 'select',
            choices: [
                {value: 1, label: 'A présenter en bureau'},
                {value: 2, label: 'En cours'},
                {value: 3, label: 'A annuler'},
                {value: 4, label: 'Clos'}
            ],
            default: 1
        },
        {
            name: 'meta_observations',
            label: 'Observations',
            type: 'text'
        },
        {
            name: 'pet_nom',
            label: 'Nom du pétitionnaire',
            type: 'line',
            required: true
        },
        {
            name: 'pet_civ',
            label: 'Civilité',
            type: 'line'
        },
        {
            name: 'pet_adresse',
            label: 'Adresse',
            type: 'line'
        },
        {
            name: 'pet_adresse2',
            type: 'line'
        },
        {
            name: 'pet_cpostal',
            label: 'Code postal',
            type: 'line'
        },
        {
            name: 'pet_commune',
            label: 'Commune',
            type: 'line'
        },
        {
            name: 'pet_telephone',
            label: 'Téléphone',
            type: 'line'
        },
        {
            name: 'pet_mobile',
            label: 'Téléphone mobile',
            type: 'line'
        },
        {
            name: 'pet_mail',
            label: 'Adresse e-mail',
            type: 'line'
        }
    ]
}

// suivi administratif
var SaForm = {
    label: 'Suivi administratif',
    readonly: true,
    fields: [
        {
            name: 'sa_massif',
            label: 'Massif concerné',
            type: 'select',
            choices: []
        },
        {
            name: 'sa_service',
            label: 'Service instructeur',
            type: 'select',
            choices: []
        },
        {
            name: 'sa_instructeur',
            label: 'Instructeur',
            type: 'line'
        },
        {
            name: 'sa_tel_instr',
            label: 'Téléphone',
            type: 'line'
        },
        {
            name: 'sa_mail_instr',
            label: 'Adresse e-mail',
            type: 'line'
        },
        {
            name: 'sa_commission',
            label: 'Commission',
            type: 'select',
            choices: []
        },
        {
            name: 'sa_axe_charte',
            label: 'Axe de la charte',
            type: 'select',
            choices: []
        },
        {
            name: 'sa_id_action',
            label: 'Code EVA action',
            type: 'line'
        },
        {
            name: 'sa_nature',
            label: "Nature de l'action",
            type: 'line'
        }
    ]
}

// subvention
var SubForm = {
    label: 'Subvention',
    readonly: true,
    fields: [
        {
            name: 'sub_objet',
            label: 'Objet',
            type: 'text'
        },
        {
            name: 'sub_commune',
            label: 'Commune',
            type: 'line'
        },
        {
            name: 'sub_zc',
            label: 'Zone coeur',
            type: 'select',
            choices: [
                {value: 1, label: 'Oui'},
                {value: 2, label: 'Non'}
            ],
            default: 1
        },
        {
            name: 'sub_ctr_patri',
            label: 'Contrat patrimoine',
            type: 'select',
            choices: [
                {value: 1, label: 'Oui'},
                {value: 2, label: 'Non'}
            ],
            default: 1
        },
        {
            name: 'sub_cout_total',
            label: 'Coût total du projet',
            type: 'number',
            step: '0.01',
            triggerEvent: 'calctauxtotal'
        },
        {
            name: 'sub_montant',
            label: 'Montant sollicité',
            type: 'number',
            step: '0.01',
            triggerEvent: 'calctauxmontant'
        },
        {
            name: 'sub_taux',
            label: 'Taux',
            step: '0.01',
            type: 'number'
        },
        {
            name: 'sub_date_rcpt',
            label: 'Date de réception',
            type: 'date',
            required: true
        },
        {
            name: 'sub_dem_pc',
            label: 'Date de demande de pièces complémentaires',
            type: 'date'
        },
        {
            name: 'sub_date_ar',
            label: "Date de délivrance de l'AR",
            type: 'date'
        },
        {
            name: 'sub_fichiers',
            label: 'Fichiers',
            type: 'upload',
            uploadDir: SERVER + '/static/upload/',
            uploadTarget: SERVER + '/upload'
        }
    ]
}

// décision
var DecForm = {
    label: 'Décision',
    readonly: true,
    fields: [
        {
            name: 'dec_date_bureau',
            label: 'Date du bureau',
            type: 'date'
        },
        {
            name: 'dec_num_delib',
            label: 'Numéro de délibération',
            type: 'line'
        },
        {
            name: 'dec_motif_refus',
            label: "Motif de refus ou d'ajournement",
            type: 'text'
        },
        {
            name: 'dec_conditions',
            label: "Conditions d'attribution",
            type: 'text'
        },
        {
            name: 'dec_montant',
            label: 'Montant attribué',
            type: 'number',
            step: '0.01',
            triggerEvent: 'calctauxattrib'
        },
        {
            name: 'dec_tva',
            label: 'TVA',
            type: 'select',
            choices: [
                {value: 1, label: 'HT'},
                {value: 2, label: 'TTC'}
            ],
            default: 1
        },
        {
            name: 'dec_taux',
            label: 'Taux de subventionnement accordé',
            step: '0.01',
            type: 'number'
        },
        {
            name: 'dec_compte',
            label: "Compte de charge d'intervention",
            type: 'select',
            choices: []
        },
        {
            name: 'dec_code_ug',
            label: 'Code UG',
            type: 'select',
            choices: []
        },
        {
            name: 'dec_operation',
            label: 'Opération',
            type: 'select',
            choices: []
        },
        {
            name: 'dec_num_ej',
            label: "Numéro d'EJ",
            type: 'line'
        },
        {
            name: 'dec_date_notif',
            label: 'Date de notification',
            type: 'date'
        },
        {
            name: 'dec_date_retour',
            label: 'Date de retour de notification signée',
            type: 'date'
        },
        {
            name: 'dec_echeance',
            label: 'Échéance',
            type: 'date'
        },
        {
            name: 'dec_relance',
            label: 'Relance',
            type: 'date'
        },
        {
            name: 'dec_prorogation',
            label: 'Prorogation',
            type: 'date'
        },
        {
            name: 'dec_fichiers',
            label: 'Fichiers',
            type: 'upload',
            uploadDir: SERVER + '/static/upload/',
            uploadTarget: SERVER + '/upload'
        }
    ]
}

// paiement
var PaiForm = {
    label: 'Paiement',
    readonly: true,
    fields: [
        {
            name: 'pai_date_recept_demande',
            label: 'Date réception demande de versement',
            type: 'date'
        },
        {
            name: 'pai_accpt1_montant',
            label: 'Montant 1er accompte',
            type: 'number',
            step: '0.01',
            triggerEvent: 'accpt1'
        },
        {
            name: 'pai_accpt1_date',
            label: 'Date 1er accompte',
            type: 'date'
        },
        {
            name: 'pai_accpt1_dp',
            label: 'N° DP',
            type: 'line'
        },
        {
            name: 'pai_accpt2_montant',
            label: 'Montant 2nd accompte',
            type: 'number',
            step: '0.01',
            triggerEvent: 'accpt2'
        },
        {
            name: 'pai_accpt2_date',
            label: 'Date 2nd accompte',
            type: 'date'
        },
        {
            name: 'pai_accpt2_dp',
            label: 'N° DP',
            type: 'line'
        },
        {
            name: 'pai_accpt3_montant',
            label: 'Montant 3e accompte',
            type: 'number',
            step: '0.01',
            triggerEvent: 'accpt3'
        },
        {
            name: 'pai_accpt3_date',
            label: 'Date 3e accompte',
            type: 'date'
        },
        {
            name: 'pai_accpt3_dp',
            label: 'N° DP',
            type: 'line'
        },
        {
            name: 'pai_accpt4_montant',
            label: 'Montant 4e accompte',
            type: 'number',
            step: '0.01',
            triggerEvent: 'accpt4'
        },
        {
            name: 'pai_accpt4_date',
            label: 'Date 4e accompte',
            type: 'date'
        },
        {
            name: 'pai_accpt4_dp',
            label: 'N° DP',
            type: 'line'
        },
        {
            name: 'pai_accpt5_montant',
            label: 'Montant 5e accompte',
            type: 'number',
            step: '0.01',
            triggerEvent: 'accpt5'
        },
        {
            name: 'pai_accpt5_date',
            label: 'Date 5e accompte',
            type: 'date'
        },
        {
            name: 'pai_accpt5_dp',
            label: 'N° DP',
            type: 'line'
        },
        {
            name: 'pai_total_verse',
            label: 'Total versé',
            step: '0.01',
            type: 'number',
            readonly: true
        },
        {
            name: 'pai_reste_du',
            label: 'Reste dû',
            step: '0.01',
            type: 'number',
            readonly: true
        },
        {
            name: 'pai_mnt_annule',
            label: 'Montant annulé',
            step: '0.01',
            type: 'number',
            triggerEvent: 'accpt6',
            default: 0
        },
        {
            name: 'pai_fichiers',
            label: 'Fichiers',
            type: 'upload',
            uploadDir: SERVER + '/static/upload/',
            uploadTarget: SERVER + '/upload'
        }
    ]
}

// tableau
var demTable = {
    selected_id: '',
    limit: 0,
    lineStyle (line) {
        var selected = line.id === parseInt(this.selected_id) ? 'table_selected ' : ''
        var s = ['primary', 'warning', 'danger', 'success'][line.meta_statut - 1]
        return selected + s
    },
    fields: [
        {
            name: 'meta_id',
            label: 'Numéro',
            nofilter: true
        },
        {
            name: 'pet_nom',
            label: 'Nom du pétitionnaire'
        },
        {
            name: 'sa_massif',
            label: 'Massif',
            transform: (val) => thesaurus.getLabel(val),
            filterType: 'select',
            choices: [],
            filter: (val, filterVal) => {
                return parseInt(val) === parseInt(filterVal)
            }
        },
        {
            name: 'sa_commission',
            label: 'Commission',
            transform: (val) => thesaurus.getLabel(val),
            filterType: 'select',
            choices: [],
            filter: (val, filterVal) => {
                return parseInt(val) === parseInt(filterVal)
            }
        },
        {
            name: 'dec_echeance',
            label: 'Échéance',
            transform: datefr,
            nofilter: true
        },
        {
            name: 'meta_statut',
            label: 'Statut',
            transform: (val) => ['À présenter', 'En cours', 'À annuler', 'Clos'][val - 1],
            filterType: 'select',
            choices: [
                {value: null, label: ''},
                {value: 1, label: 'A présenter en bureau'},
                {value: 2, label: 'En cours'},
                {value: 3, label: 'A annuler'},
                {value: 4, label: 'Clos'}
            ],
            filter: (val, filterVal) => filterVal ? parseInt(val) === parseInt(filterVal) : true
        }
    ]
}

// Récupération des données thesaurus
thesaurus.getThesaurusRef('massifs', SaForm, 'sa_massif')
thesaurus.getThesaurusRef('massifs', demTable, 'sa_massif')
thesaurus.getThesaurusRef('services_desc', SaForm, 'sa_service')
thesaurus.getThesaurusRef('services', DecForm, 'dec_code_ug')
thesaurus.getThesaurusRef('compte_charge_subs', DecForm, 'dec_compte')
thesaurus.getThesaurusRef('operation_sub', DecForm, 'dec_operation')
thesaurus.getThesaurusRef('commission', SaForm, 'sa_commission')
thesaurus.getThesaurusRef('commission', demTable, 'sa_commission')
thesaurus.getThesaurusRef('axe_charte', SaForm, 'sa_axe_charte')

export {
    PetForm,
    SaForm,
    SubForm,
    DecForm,
    PaiForm,
    demTable
}
