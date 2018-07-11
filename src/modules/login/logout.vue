<template>
    <div class="main-content">
        <h1 class="titlebar">Déconnexion</h1>
        <div>
            <p>Vous êtes maintenant déconnecté</p>
            <router-link to="login">Reconnectez vous</router-link>
        </div>
    </div>
</template>
<script>
import User from './User'

export default {
    name: 'Logout',
    mounted () {
        this.$store.commit('setUser', new User())
        window.sessionStorage.setItem('tizoutis-login', '')
    }
}
</script>
