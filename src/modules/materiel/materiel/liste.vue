<template>
    <div>
        <typeSelect @checked="selectTypes" />
        <div v-if="tableValue.length">
            <dyn-table :config="tableCtrl" v-model="tableValue" @select="select" />
        </div>
        <div v-else>
            Sélectionner une catégorie
        </div>
    </div>
</template>
<script>
// import {DynTable, TableController} from '@/components/tools/dyntable'
import {DynTable} from '@/components/tools/DTable'
import {Notification} from 'uiv'
import typeSelect from './typeSelect'

const CONFIG = {
    selected_id: '',
    limit: 0,
    lineStyle (line) {
        var baseStyle = 'selectable '
        baseStyle += line.disponible ? 'success ' : 'danger '
        return baseStyle + (parseInt(line.id) === parseInt(this.selected_id) ? 'table_selected' : '')
    },
    fields: [
        {
            name: 'label',
            label: 'Label',
            filterFunc: 'strContains'
        },
        {
            name: 'type_mat',
            label: 'Type matériel',
            transform: val => val.label,
            noFilter: true
        },
        {
            name: 'reference',
            label: 'Référence/N° série'
        },
        {
            name: 'utilisateur_actuel',
            label: 'Utilisateur',
            filterFunc: 'strContains'
        }
    ]
}

export default {
    name: 'materielList',
    components: {
        DynTable,
        typeSelect
    },
    data () {
        return {
            tableCtrl: CONFIG
        }
    },
    computed: {
        tableValue () {
            return this.$store.getters['materiel/matList']
        }
    },
    methods: {
        init (keys) {
            this.$store.dispatch('typeMateriel/getList').then(() => {
                this.$store.dispatch('materiel/getList', keys).catch(() => {
                    Notification.notify({
                        content: 'Une erreur est survenue !',
                        placement: 'top-right',
                        type: 'danger'
                    })
                })
            })
        },
        select (value) {
            if (value.id !== this.tableCtrl.selected_id) {
                this.tableCtrl.selected_id = value.id
                this.$store.dispatch('materiel/getOne', value).then(resp => {
                    this.$store.dispatch('affectationMat/getList', resp.id)
                    this.$emit('selected', resp)
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        deselect () {
            this.tableCtrl.selected_id = ''
        },
        selectTypes (keys) {
            this.init(keys)
        }
    },
    mounted () {
        this.init()
    }
}
</script>
