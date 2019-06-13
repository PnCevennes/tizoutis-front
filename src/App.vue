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
import {AuthMixin} from '@/core/mixins'
import {CORE_MODULES} from '@/core'
import {MODULES} from '@/modules'
import {VERSION, BUILD, BUILD_NAME} from '@/config'

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
            return 'Version: ' + VERSION + BUILD
        }
    },
    data () {
        return {
            MODULES: [...MODULES, ...CORE_MODULES]
        }
    },
    created () {
        document.title = BUILD_NAME
        this.$store.commit('setRoute', this.$router.currentRoute)
        this.$router.push({name: 'login', query: {reconnect: true}})
    }
}
</script>
