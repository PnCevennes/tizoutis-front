<template>
    <div id="app">
        <div class="main-nav" v-if="user.name">
            <router-link class="main-nav-btn" to="/annuaire">Annuaire</router-link>
            <router-link class="main-nav-btn" to="/recrutement">Recrutement</router-link>
            <router-link class="main-nav-btn" to="/interventions">Interventions</router-link>
            <router-link v-if="isAuth('tizoutis-travaux-batiments-admin')" class="main-nav-btn" to="/batiments">Bâtiments</router-link>
            <div class="separator"></div>
            <div class="msg loading" v-if="loadingData"><span class="glyphicon glyphicon-transfer"></span> Chargement des données...</div>
            <div class="msg saving" v-if="savingData"><span class="glyphicon glyphicon-transfer"></span> Enregistrement des données...</div>
            <router-link class="main-nav-btn" to="/logout">{{user.name}}</router-link>
        </div>
        <div class="main-nav" v-else>
            <div class="separator"></div>
            <router-link class="main-nav-btn" to="/login">Login</router-link>
        </div>
        <div class="main-container container-fluid">
            <router-view/>
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
        isAuth () {
            return this.$store.getters.isAuth
        },
        loadingData () {
            return this.$store.state.loading
        },
        savingData () {
            return this.$store.state.saving
        }
    }
}
</script>
