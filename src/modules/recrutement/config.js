import {SERVER} from '@/config'
import {Validators} from '@/components/tools/dynform'
import {Thesaurus, datefr} from '@/components/tools'

/*
 * Nomenclatures réclamées :
 *  + lieu_affectation
 *  + services
 *  + logements
 *  + type_contrat
 *  + categorie
 *  + temps_travail
 *  + materiel
 */

var headForm = {
    label: 'Notification',
    fields: [
        {
            name: 'meta_create',
            label: 'Date de création de la fiche',
            type: 'date',
            readonly: true,
            condition: (data) => data.meta_create !== undefined && data.meta_create !== null && data.meta_create !== '',
            default: null
        },
        {
            name: 'meta_update',
            label: 'Dernière modification',
            type: 'date',
            readonly: true,
            condition: (data) => data.meta_update !== undefined && data.meta_update !== null && data.meta_update !== '',
            default: null
        },
        {
            name: 'meta_createur_fiche',
            label: 'Créateur de la fiche',
            type: 'line'
        },
        {
            name: 'ctrl_notif',
            label: 'Notifier',
            type: 'bool',
            default: true
        },
        {
            name: 'notif_list',
            label: 'Personnes à notifier',
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
        }
    ]
}

var reqForm = {
    label: 'Fiche de recrutement',
    fields: [
        {
            name: 'nom',
            label: 'Nom',
            type: 'line',
            validators: [Validators.minLength(2)],
            errmsg: 'Saisissez un nom'
        },
        {
            name: 'prenom',
            label: 'Prénom',
            type: 'line',
            validators: [Validators.minLength(2)],
            errmsg: 'Saisissez un prénom'
        },
        {
            name: 'service_id',
            label: 'Service',
            type: 'select',
            choices: []
        },
        {
            name: 'intitule_poste',
            label: 'Intitulé du poste',
            type: 'line',
            validators: [Validators.minLength(2)],
            errmsg: 'Saisissez un intitulé'
        },
        {
            name: 'desc_mission',
            label: 'Description de la mission',
            type: 'text'
        },
        {
            name: 'type_contrat',
            label: 'Type de contrat',
            type: 'select',
            choices: []
        },
        {
            name: 'arrivee',
            label: "Date d'arrivée",
            type: 'date'
        },
        {
            name: 'depart',
            label: 'Date de fin de contrat',
            type: 'date',
            condition (data) {
                // eslint-disable-next-line
                return data.type_contrat != 22
            }
        },
        {
            name: 'referent',
            label: 'Référent',
            type: 'line',
            condition (data) {
                // eslint-disable-next-line
                return data.type_contrat == 25
            }
        },
        {
            name: 'convention_signee',
            label: 'Convention signée',
            type: 'bool',
            condition (data) {
                // eslint-disable-next-line
                return data.type_contrat == 25
            }
        },
        {
            name: 'gratification',
            label: 'Gratification',
            type: 'bool',
            condition (data) {
                // eslint-disable-next-line
                return data.type_contrat == 25
            }
        },
        {
            name: 'categorie',
            label: 'Catégorie',
            type: 'select',
            choices: [],
            condition (data) {
                // eslint-disable-next-line
                return data.type_contrat != 25
            }
        },
        {
            name: 'temps_travail',
            label: 'Temps de travail',
            type: 'select',
            choices: []
        },
        {
            name: 'temps_travail_autre',
            label: 'Temps de travail - autre',
            type: 'line',
            condition (data) {
                // eslint-disable-next-line
                return data.temps_travail == 37
            }
        },
        {
            name: 'lieu',
            label: "Lieu d'affectation",
            type: 'select',
            choices: []
        },
        {
            name: 'residence_administrative',
            label: 'Résidence administrative',
            type: 'line'
        },
        {
            name: 'logement',
            label: 'Logement',
            type: 'select',
            choices: []
        },
        {
            name: 'materiel',
            label: 'Matériel',
            type: 'checklist',
            choices: []
        },
        {
            name: 'bureau',
            label: 'Bureau affecté',
            type: 'line'
        },
        {
            name: 'observations',
            label: 'Observations',
            type: 'text'
        },
        {
            name: 'fichiers',
            label: 'Fichiers',
            type: 'upload',
            referId: 'recrutement',
            uploadDir: SERVER + '/static/upload/',
            uploadTarget: SERVER + '/upload'
        }
    ]
}

var thesaurus = new Thesaurus()

thesaurus.getThesaurusRef('lieu_affectation', reqForm, 'lieu')
thesaurus.getThesaurusRef('services', reqForm, 'service_id')
thesaurus.getThesaurusRef('logements', reqForm, 'logement')
thesaurus.getThesaurusRef('type_contrat', reqForm, 'type_contrat')
thesaurus.getThesaurusRef('categorie', reqForm, 'categorie')
thesaurus.getThesaurusRef('temps_travail', reqForm, 'temps_travail')
thesaurus.getThesaurusRef('materiel', reqForm, 'materiel')

var demTable = {
    selected_id: '',
    limit: 0,
    lineStyle (line) {
        var selected = line.id === parseInt(this.selected_id) ? 'table_selected ' : ''
        if (line.depart && (new Date(line.depart) < new Date())) {
            return selected + 'danger'
        } else if (new Date(line.arrivee) < new Date()) {
            return selected + 'success'
        } else {
            return selected + 'warning'
        }
    },
    fields: [
        {
            name: 'nom',
            label: 'Nom',
            nofilter: true
        },
        {
            name: 'prenom',
            label: 'Prénom',
            nofilter: true
        },
        {
            name: 'intitule_poste',
            label: 'Poste',
            nofilter: true
        },
        {
            name: 'arrivee',
            label: 'Arrivée',
            transform: datefr,
            nofilter: true
        },
        {
            name: 'service_id',
            label: 'Service',
            transform: (val) => thesaurus.getLabel(val),
            nofilter: true
        }
    ]
}

export {demTable, headForm, reqForm}
