import {SERVER} from '@/config'
import {Validators} from '@/components/tools/dynform'
import {Thesaurus, RefGeo, datefr} from '@/components/tools'

/*
 * Configuration du formulaire partie demande
 */
var reqForm = {
    label: 'Demande',
    fields: [
        {
            name: 'dmdr_service',
            label: 'Service demandeur',
            type: 'select',
            choices: [],
            default: '13'
        },
        {
            name: 'dmdr_contact_nom',
            label: 'Créateur de la fiche',
            type: 'line',
            validators: [Validators.minLength(2)],
            errmsg: 'Le nom doit au minimum avoir deux lettres',
            default: ''
        },
        {
            name: 'dmdr_contact_email',
            label: 'Adresse e-mail',
            type: 'repeated',
            default: [''],
            config: {
                name: 'dmdr_contact_email',
                type: 'autocomplete',
                url: SERVER + '/annuaire/entites/',
                urlfilters: '?type=correspondant&result=email&col=email&filter=email',
                errmsg: 'Adresse e-mail du contact',
                default: ''
            }
        },
        {
            name: 'dem_commune',
            label: 'Commune',
            type: 'select',
            choices: [],
            triggerEvent: 'commune-changed',
            default: ''
        },
        {
            name: 'dem_designation',
            label: 'Designation bâtiment',
            type: 'select',
            choices: [],
            default: ''
        },
        {
            name: 'dem_type_travaux',
            label: 'Types de travaux',
            type: 'select',
            choices: [],
            default: ''
        },
        {
            name: 'dem_description_travaux',
            label: 'Description des travaux',
            type: 'text'
        },
        {
            name: 'dem_importance_travaux',
            label: 'Importance des travaux',
            type: 'select',
            choices: [
                {value: 1, label: 'Petits travaux'},
                {value: 2, label: 'Moyen'},
                {value: 3, label: 'Travaux importants'}
            ],
            default: ''
        },
        {
            name: 'dem_fichiers',
            label: 'Fichiers',
            type: 'upload',
            uploadDir: SERVER + '/static/upload/',
            uploadTarget: SERVER + '/upload'
        }
    ]
}

/*
 * Configuration du formulaire partie planification
 */
var planForm = {
    label: 'Planification',
    readonly: true,
    fields: [
        {
            name: 'plan_date',
            label: 'Date de début prévisionnelle',
            type: 'date'
        },
        {
            name: 'plan_service',
            label: 'Service responsable des travaux',
            type: 'select',
            choices: [],
            default: ''
        },
        {
            name: 'plan_entreprise',
            label: 'Entreprise en charge des travaux',
            type: 'line'
        },
        {
            name: 'plan_commentaire',
            label: 'Commentaire de planification',
            type: 'text'
        },
        {
            name: 'plan_fichiers',
            label: 'Fichiers',
            type: 'upload',
            uploadDir: SERVER + '/static/upload/',
            uploadTarget: SERVER + '/upload'
        }
    ]
}

/*
 * Configuration du formulaire partie réalisation
 */
var reaForm = {
    label: 'Réalisation',
    readonly: true,
    fields: [
        {
            name: 'rea_date',
            label: 'Date de réalisation',
            type: 'date'
        },
        {
            name: 'rea_duree',
            label: 'Durée totales en heures',
            type: 'number'
        },
        {
            name: 'rea_commentaire',
            label: 'Rapport de travaux',
            type: 'text'
        },
        {
            name: 'rea_fichiers',
            label: 'Fichiers',
            type: 'upload',
            uploadDir: SERVER + '/static/upload/',
            uploadTarget: SERVER + '/upload'
        }
    ]
}

var thesaurus = new Thesaurus()
var refGeo = new RefGeo()

thesaurus.getThesaurusRef(74, reqForm, 'dmdr_service')
thesaurus.getThesaurusRef(75, reqForm, 'dem_type_travaux')
thesaurus.getThesaurusRef(76, planForm, 'plan_service')
refGeo.getAllBatiments()
refGeo.getCommunes(reqForm, 'dem_commune')

/*
 * Configuration du tableau
 */
var demTable = {
    selected_id: '',
    limit: 0,
    lineStyle (line) {
        var selected = line.id === parseInt(this.selected_id) ? 'table_selected ' : ''
        if (!line.rea_date) {
            return selected + 'warning'
        } else if (new Date(line.rea_date) > new Date()) {
            return selected + 'success'
        } else {
            return selected + 'danger'
        }
    },
    fields: [
        {
            name: 'dem_designation',
            label: 'Désignation',
            transform: (val) => refGeo.getBatimentLabel(val),
            nofilter: true
        },
        {
            name: 'dem_date',
            label: 'Date',
            transform: datefr,
            nofilter: true
        },
        {
            name: 'dem_commune',
            label: 'Commune',
            transform: (val) => refGeo.getCommuneLabel(val),
            nofilter: true
        }
    ]
}

export {reqForm, planForm, reaForm, demTable, refGeo}
