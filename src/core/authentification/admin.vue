<template>
    <div>
        <h1 class="titlebar">Utilisateurs</h1>
        <div class="general-content">
            <div class="main-list">
                <div>
                    <dyn-table :controller="demTableCtrl" @select="select" />
                </div>
            </div>
            <div class="side-form">
                <div class="dynform right-align">
                    <button type="button" @click="newCard">Nouvel utilisateur</button>
                </div>
                <div>
                    <dyn-form :config="formCtrl" v-model="form_content" @commit="save($event)" @remove="remove($event)" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {SERVER} from '@/config'
import {GeneralMixin} from '@/core/mixins'
import {DynForm} from '@/components/tools/dynform'
import {DynTable, TableController} from '@/components/tools/dyntable'
import {userList, userForm} from './config'

export default {
    name: 'auth',
    mixins: [GeneralMixin],
    components: {
        DynForm,
        DynTable
    },
    props: {
        query: {
            default: null
        }
    },
    data () {
        return {
            groupAdmin: 'tizoutis-admin',
            routeName: 'users',
            ressourceUrl: 'auth/users',
            demTableCtrl: new TableController(userList),
            userForm: [userForm]
        }
    },
    methods: {
        getGroups () {
            axios.get(SERVER + '/auth/groups').then(
                (res) => {
                    var grps = userForm.fields.filter(x => x.name === 'groups')[0]
                    grps.choices = res.data.map(x => { return {value: x.name, label: x.name} })
                }).catch(
                (err) => {
                    console.log(err)
                })
        }
    },
    mounted () {
        if (!this.$store.getters.isMember('tizoutis-admin')) {
            this.$router.push({name: 'login'})
        }

        this.getGroups()
    }
}
</script>
