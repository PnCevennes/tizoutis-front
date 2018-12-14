<template>
    <div>
        <h1 class="titlebar">Supervision</h1>
        <div class="general-content">
            <div class="main-list">
                <dyn-table :controller="demTableCtrl" @select="select" />
            </div>
            <div class="side-form">
                <div class="dynform right-align">
                    <button type="button" @click="newCard">Nouvel équipement</button>
                </div>
                <div>
                    <dyn-form :config="formCtrl" v-model="form_content" @commit="save($event)" @remove="remove($event)" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {DynTable, TableController} from '@/components/tools/dyntable'
import {DynForm, Validators} from '@/components/tools/dynform'
import {GeneralMixin, AuthMixin} from '@/core/mixins'
import {datefr} from '@/components/tools'

const typeChoices = [
    {
        value: 0,
        label: ''
    },
    {
        value: 1,
        label: 'Serveur'
    },
    {
        value: 2,
        label: 'Imprimante'
    },
    {
        value: 3,
        label: 'NAS'
    },
    {
        value: 4,
        label: 'Switch/Routeur'
    },
    {
        value: 5,
        label: 'Autre'
    }
]

const tblconf = {
    limit: 0,
    lineStyle (line) {
        var selected = parseInt(line.id) === parseInt(this.selected_id) ? 'table_selected ' : ''
        if (parseInt(line.status) === 0) {
            return selected + 'warning'
        } else {
            return selected + 'success'
        }
    },
    disallowSingleSelect: true,
    fields: [
        {
            name: 'ip_addr',
            label: 'Adresse IP',
            filterLabel: 'Filtrer les IP',
            transform: (ip) => { return '<a href="http://' + ip + '" target="_blank">' + ip + '</a>' }
        },
        {
            name: 'label',
            label: 'Nom'
        },
        {
            name: 'equip_type',
            label: 'Type',
            transform: (val) => val ? typeChoices.find(x => x.value === parseInt(val)).label : '',
            nofilter: true
        },
        {
            name: 'last_up',
            label: 'Last UP',
            transform: (val) => {
                if (val) {
                    var dateArray = val.split(' ')
                    var dateStr = datefr(dateArray[0])
                    var timeStr = dateArray[1]
                    return dateStr + ' ' + timeStr
                }
                return 'Jamais'
            }
        },
        {
            name: 'status',
            label: 'Statut',
            transform: (val) => parseInt(val) === 1 ? 'up' : 'down'
        }

    ]
}

const formConf = {
    label: 'Équipement réseau',
    fields: [
        {
            name: 'ip_addr',
            label: 'Adresse IP',
            type: 'line',
            validators: [Validators.minLength(10)],
            errmsg: 'Saisissez une adresse IP valide'
        },
        {
            name: 'label',
            label: 'Nom du serveur',
            type: 'line',
            validators: [Validators.minLength(3), Validators.maxLength(50)],
            errmsg: 'Le nom doit faire entre 3 et 50 caractères'
        },
        {
            name: 'equip_type',
            label: "Type d'équipement",
            type: 'select',
            choices: typeChoices
        },
        {
            name: 'commentaires',
            label: 'Commentaires',
            type: 'text'
        }
    ]
}

export default {
    name: 'supervision',
    components: {DynTable, DynForm},
    mixins: [GeneralMixin, AuthMixin],
    props: {
        query: {default: null}
    },
    data () {
        return {
            groupAdmin: 'tizoutis-supervision',
            routeName: 'supervision',
            ressourceUrl: 'supervision',
            demTableCtrl: new TableController(tblconf),
            userForm: [formConf],
            timer: null
        }
    },
    mounted () {
        this.timer = setInterval(() => { this.getAllCards(0) }, 300000)
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>
