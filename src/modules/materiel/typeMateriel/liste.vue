<template>
    <div>
        <dyn-table :controller="tableCtrl" @select="select" />
    </div>
</template>
<script>
import {DynTable, TableController} from '@/components/tools/dyntable'

const CONFIG = {
    selected_id: '',
    limit: 0,
    lineStyle (line) {
        return (parseInt(line.id) === parseInt(this.selected_id) ? 'table_selected' : '')
    },
    fields: [
        {
            name: 'label',
            label: 'Label'
        }
    ]
}

export default {
    name: 'typeMaterielList',
    components: {
        DynTable
    },
    data () {
        return {
            tableCtrl: new TableController(CONFIG)
        }
    },
    methods: {
        init () {
            this.$store.dispatch('typeMateriel/getList').then(resp => {
                this.tableCtrl.setData(resp)
            })
        },
        select (data) {
            this.tableCtrl.selected_id = data.id
            this.$emit('selected', data)
        },
        deselect () {
            this.tableCtrl.selected_id = ''
        },
        update (data) {
            this.tableCtrl.setData(this.$store.state.typeMateriel.typeMatList)
        }
    },
    mounted () {
        this.init()
    }
}
</script>
