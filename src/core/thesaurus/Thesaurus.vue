<template>
    <div>
        <h1 class="titlebar">Thesaurus</h1>
        <div class="general-content">
            <ul class="tree-list">
                <li>
                    <span class="th-label">/</span>
                    <button class="btn btn-xs btn-success" type="button" @click="add(0)"><span class="glyphicon glyphicon-plus"></span></button>
                    <div class="th-row" v-if="addref===0">
                        <input type="text" v-model="addval">
                        <button type="button" class="btn btn-xs btn-success" @click="save(addval)"><span class="glyphicon glyphicon-ok"></span></button>
                        <button type="button" class="btn btn-xs btn-warning" @click="close"><span class="glyphicon glyphicon-remove"></span></button>
                    </div>
                </li>
                <li>
                    <recursive-list :items="items" :idref="0" :editid="editid" :addref="addref" @edit="edit($event)" @add="add($event)" @save="save($event)" @remove="remove" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {Notification} from 'uiv'
import {SERVER} from '@/config'
import {AuthMixin} from '@/core/mixins'
import RecursiveList from '@/components/tools/recursivelist'

export default {
    name: 'Thesaurus',
    mixins: [AuthMixin],
    components: {
        RecursiveList
    },
    data () {
        return {
            groupAdmin: ['tizoutis-admin'],
            items: [],
            editid: null,
            addref: null,
            addval: ''
        }
    },
    computed: {
        maxid () {
            return Math.max(...this.items.map(x => x.id)) + 1
        }
    },
    methods: {
        load () {
            var token = this.$store.state.userToken
            axios.get(SERVER + '/thesaurus?token=' + token).then(
                res => { this.items = res.data }
            ).catch(
                err => { console.log(err) }
            )
        },
        edit (id) {
            this.editid = id
            this.addref = null
        },
        add (idref) {
            this.editid = null
            this.addref = idref
        },
        close () {
            this.addref = null
            this.addval = ''
        },
        save (label) {
            var data = {}
            var apiUrl = ''
            var token = this.$store.state.userToken
            if (this.editid) {
                var item = this.items.find(x => x.id === this.editid)
                data = {
                    id: this.editid,
                    id_ref: item.id_ref,
                    label: label
                }
                apiUrl = SERVER + '/thesaurus/' + this.editid + '?token=' + token
                console.log('change', data)
            } else {
                data = {
                    id: this.maxid,
                    id_ref: this.addref,
                    label: label
                }
                apiUrl = SERVER + '/thesaurus/?token=' + token
            }
            axios.post(apiUrl, data).then(
                res => {
                    Notification.notify({
                        content: 'Enregistrement effectué',
                        placement: 'top-right',
                        type: 'success'
                    })
                    this.load()
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
            this.editid = null
            this.addref = null
            this.addval = null
        },
        remove () {
            var token = this.$store.state.userToken
            var apiUrl = SERVER + '/thesaurus/' + this.editid + '?token=' + token
            axios.delete(apiUrl).then(
                res => {
                    Notification.notify({
                        content: 'Suppression effectuée',
                        placement: 'top-right',
                        type: 'success'
                    })
                    this.load()
                }
            ).catch(
                err => {
                    console.log(err)
                }
            )
        }
    },
    mounted () {
        this.load()
    }
}
</script>
