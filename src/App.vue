<template>
    <div id="app">
        <div class="main-nav">
            <img src="static/img/Spirale_orange.png" height="28" width="28" />
            <span class="main-nav-label">TiZouTis</span>
            <div v-if="user.name">
                <router-link class="main-nav-btn" to="/annuaire">Annuaire</router-link>
                <router-link class="main-nav-btn" to="/recrutement">Recrutement</router-link>
                <router-link class="main-nav-btn" to="/interventions">Interventions</router-link>
                <router-link v-if="isMember(batimentsGroups)" class="main-nav-btn" to="/batiments">Bâtiments</router-link>
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
export default {
    name: 'App',
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
        }
    },
    data () {
        return {
            batimentsGroups: ['tizoutis-travaux-batiments-admin', 'tizoutis-travaux-batiments-user']
        }
    }
}
</script>
