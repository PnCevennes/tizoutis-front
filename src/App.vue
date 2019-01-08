<template>
    <div id="app">
        <div class="main-nav">
            <img src="static/img/Spirale_orange.png" height="28" width="28" />
            <span class="main-nav-label" :title="buildnbr">TiZouTis</span>
            <div v-if="user.name">
                <router-link :key="item.path" v-for="item in MODULES" class="main-nav-btn" :to="item.path" v-if="isMember(item.access)">{{item.label}}</router-link>
                <div class="main-nav-sep"></div>
                <div class="msg loading" v-if="loadingData"><span class="glyphicon glyphicon-time"></span> Chargement des données...</div>
                <div class="msg saving" v-if="savingData"><span class="glyphicon glyphicon-time"></span> Enregistrement des données...</div>
                <router-link class="main-nav-btn" to="/logout">{{user.name}}</router-link>
            </div>
            <div v-else>
                <div class="main-nav-sep"></div>
                <router-link class="main-nav-btn" to="/login">Login</router-link>
            </div>
        </div>
        <div class="main-container container-fluid">
            <transition name="fade">
                <router-view/>
            </transition>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {AuthMixin} from '@/core/mixins'
import {CORE_MODULES} from '@/core'
import {MODULES} from '@/modules'
import {User, URLS} from '@/core/authentification'
import {BUILD} from '@/config'

export default {
    name: 'App',
    mixins: [AuthMixin],
    computed: {
        user () {
            return this.$store.state.user
        },
        isMember () {
            return this.$store.getters.isMember
        },
        loadingData () {
            return this.$store.state.loading
        },
        savingData () {
            return this.$store.state.saving
        },
        buildnbr () {
            return 'Version: 1.0.' + BUILD
        }
    },
    data () {
        return {
            MODULES: [...MODULES, ...CORE_MODULES]
        }
    },
    mounted () {
        var rawLoginData = window.localStorage.getItem('tizoutis-userdata')
        var currentRouteName = this.$router.currentRoute.name
        if (!rawLoginData || !rawLoginData.length) {
            console.log('delog')
        } else {
            var loginData = JSON.parse(rawLoginData)
            var postdata = {id: loginData.uid, token: loginData.token}
            axios.post(URLS.reconnect, postdata).then((res) => {
                if (res) {
                    console.log('reconnex OK')
                    console.log(res.data)
                    this.$store.commit('setUser', new User(res.data.userdata))
                    this.$store.commit('setUserToken', res.data.token)
                    this.$store.commit('dataSaved')
                    this.$router.push({name: currentRouteName})
                }
            }).catch(() => {
                this.$store.commit('dataSaved')
                if (this.$router.currentRoute.name !== 'login') {
                    this.$store.commit('setRoute', this.$router.currentRoute)
                    this.$router.push('login')
                }
            })
        }
    }
}
</script>
