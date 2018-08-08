<template>
    <div class="main-content">
        <h1 class="titlebar">Connexion</h1>
        <div class="login-form dynform">
            <div>
                <label for="login">Login : </label><input id="login" type="text" v-model="login" />
            </div>
            <div>
                <label for="pwd">Mot de passe : </label><input id="pwd" type="password" v-model="passwd" />
            </div>
            <div class="toolbox">
                <div class="separator"></div>
                <button class="btn btn-xs btn-success" type="button" @click="loginfn">Login</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {URLS} from './config'
import {Notification} from 'uiv'
import User from './User'

export default {
    name: 'Login',
    components: {
        Notification
    },
    data () {
        return {
            login: '',
            passwd: ''
        }
    },
    methods: {
        loginfn () {
            this.$store.commit('loadingData')
            axios.post(URLS.login, {login: this.login, passwd: this.passwd}).then((res) => {
                window.localStorage.setItem('tizoutis-userdata', JSON.stringify({uid: res.data.id, token: res.data.token}))
                this.$store.commit('dataLoaded')
                this.$store.commit('setUser', new User(res.data.userdata))
                Notification.notify({
                    title: 'Authentification',
                    content: 'Bienvenue ' + res.data.userdata.name,
                    placement: 'top-right',
                    type: 'success'
                })
                this.$router.push(this.$store.getters.redirectRoute)
                this.$store.commit('setRoute', {name: 'index'})
            }).catch(() => {
                window.sessionStorage.setItem('tizoutis-userdata', '')
                this.$store.commit('dataLoaded')
                Notification.notify({
                    title: 'Authentification',
                    content: "Erreur d'authentification ! Vérifiez votre mot de passe.",
                    placement: 'top-right',
                    type: 'danger'
                })
                this.passwd = ''
            })
        }
    }
}
</script>
