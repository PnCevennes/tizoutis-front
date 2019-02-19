<template>
    <div class="main-content">
        <h1 class="titlebar">Déconnexion</h1>
        <div class="login-form">
            <h1>Vous êtes maintenant déconnecté</h1>
            <p>
                <router-link to="login">Reconnectez vous</router-link>
            </p>
        </div>
    </div>
</template>
<script>
import User from './User'

export default {
    name: 'Logout',
    mounted () {
        this.$store.commit('setUser', new User())
        window.localStorage.setItem('tizoutis-userdata', '')
    }
}
</script>
