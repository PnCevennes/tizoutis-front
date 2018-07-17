import {SERVER} from '@/config'
import {Validators} from '@/components/tools/dynform'
import {Thesaurus, datefr} from '@/components/tools'

var reqForm = {
    label: 'Demande',
    fields: [
        {
            name: 'num_intv',
            label: "Numéro d'intervention",
            type: 'line',
            validators: [Validators.minLength(1)],
            errmsg: "Saisissez un numéro d'intervention"
        },
        {
            name: 'dmdr_service',
            label: 'Service demandeur',
            type: 'select',
            choices: [],
            default: '13'
        },
        {
            name: 'dmdr_contact_nom',
            label: 'nom',
            type: 'line',
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
            name: 'dem_objet',
            label: 'Objet de la demande',
            type: 'select',
            choices: [],
            default: 58
        },
        {
            name: 'dem_localisation',
            label: 'Massif',
            type: 'select',
            choices: [],
            default: ''
        },
        {
            name: 'dem_loc_commune',
            label: 'Commune',
            type: 'line'
        },
        {
            name: 'dem_loc_libelle',
            label: "Lieu d'intervention",
            type: 'line',
            validators: [Validators.minLength(1)],
            errmsg: "Saisissez un lieu d'intervention",
            default: ''
        },
        {
            name: 'dem_details',
            label: 'Détails de la demande',
            type: 'text'
        },
        {
            name: 'dem_delai',
            label: 'Délai souhaité',
            type: 'line'
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

var planForm = {
    label: 'Planification',
    readonly: true,
    fields: [
        {
            name: 'plan_date',
            label: "Date d'intervention prévisionnelle",
            type: 'date'
        },
        {
            name: 'plan_commentaire',
            label: 'Commentaire de planification',
            type: 'text'
        }
    ]
}

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
            name: 'rea_nb_agents',
            label: "Nombre d'agents affectés",
            type: 'number'
        },
        {
            name: 'rea_commentaire',
            label: 'Rapport de travaux',
            type: 'text'
        },
        {
            name: 'rea_fichiers',
            label: 'Fichiers Réalisation',
            type: 'upload',
            uploadDir: SERVER + '/static/upload/',
            uploadTarget: SERVER + '/upload'
        }
    ]
}

var thesaurus = new Thesaurus()

thesaurus.getThesaurusRef(2, reqForm, 'dmdr_service')
thesaurus.getThesaurusRef(46, reqForm, 'dem_objet')
thesaurus.getThesaurusRef(51, reqForm, 'dem_localisation')

var demTable = {
    selected_id: '',
    limit: 0,
    lineStyle (line) {
        var selected = line.id === parseInt(this.selected_id) ? 'table_selected ' : ''
        if (!line.rea_date) {
            return selected + 'warning'
        } else if (new Date(line.rea_date) > new Date()) {
            return selected + 'danger'
        } else {
            return selected + 'success'
        }
    },
    fields: [
        {
            name: 'num_intv',
            label: 'Numéro',
            filter: (val, filterVal) => { return parseInt(val) < parseInt(filterVal) }
        },
        {
            name: 'dem_date',
            label: 'Date',
            transform: datefr,
            nofilter: true
        },
        {
            name: 'dem_objet',
            label: "Type d'intervention",
            transform: (val) => thesaurus.getLabel(val),
            nofilter: true
        },
        {
            name: 'dem_loc_libelle',
            label: 'Localisation'
        }
    ]
}

export {reqForm, planForm, reaForm, demTable}
