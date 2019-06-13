<template>
    <ul class="th-list">
        <li v-for="item in items" v-if="item.id_ref==idref" :key="item.id">
            <div class="th-row" v-if="item.id !== editid">
                <span class="text-danger">{{item.id}}</span>
                <div class="th-label">{{item.label}}</div>
                <span class="badge dark-success" v-if="item.menu">Menu</span>
                <span class="badge dark-warning" v-else>Menu</span>
                <button type="button" class="btn btn-xs btn-warning" @click="edit(item.id)">
                    <span class="glyphicon glyphicon-pencil"></span>
                </button>
                <button type="button" class="btn btn-xs btn-success" @click="add(item.id)">
                    <span class="glyphicon glyphicon-plus"></span>
                </button>
            </div>
            <div class="th-row" v-else>
                <span class="text-danger">{{item.id}}</span>
                <input type="text" v-model="item.label" />
                <label>Menu <input type="checkbox" v-model="item.menu" /></label>
                <button type="button" class="btn btn-xs btn-success" @click="save([item.label, item.menu])"><span class="glyphicon glyphicon-ok"></span></button>
                <button type="button" class="btn btn-xs btn-warning" @click="close"><span class="glyphicon glyphicon-remove"></span></button>
                <button type="button" class="btn btn-xs btn-danger" @click="remove"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
            <div class="th-row" v-if="item.id==addref">
                <input type="text" v-model="addval">
                <label>Menu <input type="checkbox" v-model="menu" /></label>
                <button type="button" class="btn btn-xs btn-success" @click="save([addval, menu])"><span class="glyphicon glyphicon-ok"></span></button>
                <button type="button" class="btn btn-xs btn-warning" @click="close"><span class="glyphicon glyphicon-remove"></span></button>
                <button type="button" class="btn btn-xs btn-danger" @click="remove"><span class="glyphicon glyphicon-trash"></span></button>
            </div>
            <recursive-list :showids="showids" :items="items" :idref="item.id" :editid="editid" :addref="addref" @edit="edit($event)" @add="add($event)" @save="save($event)" @remove="remove" />
        </li>
    </ul>
</template>
<script>
export default {
    name: 'RecursiveList',
    props: ['items', 'idref', 'editid', 'addref', 'showids'],
    data () {
        return {
            addval: '',
            menu: false
        }
    },
    methods: {
        edit (id) {
            this.$emit('edit', id)
        },
        add (idref) {
            this.$emit('add', idref)
        },
        close () {
            this.addval = ''
            this.$emit('edit', null)
        },
        save (data) {
            this.$emit('save', data)
            this.addval = ''
        },
        remove () {
            this.$emit('remove')
        }
    }
}
</script>
<style scoped>
.dark-success {
    background-color: green;
}
.dark-warning {
    background-color: darkred;
}
</style>
