import axios from 'axios'
import {URLS, User} from '@/modules/authentification'

export default {
    mounted () {
        if (!this.$store.getters.isAuth) {
            var rawLoginData = window.localStorage.getItem('tizoutis-userdata')
            if (!rawLoginData.length) {
                if (this.$router.currentRoute.name !== 'login') {
                    this.$store.commit('setRoute', this.$router.currentRoute)
                    this.$router.push('login')
                }
            } else {
                var loginData = JSON.parse(rawLoginData)
                if (loginData) {
                    this.$store.commit('savingData')
                    var postdata = {id: loginData.uid, token: loginData.token}
                    axios.post(URLS.reconnect, postdata).then((res) => {
                        if (res) {
                            this.$store.commit('setUser', new User(res.data.userdata))
                            this.$store.commit('setUserToken', res.data.token)
                            this.$store.commit('dataSaved')
                        }
                    }).catch(() => {
                        this.$store.commit('dataSaved')
                        if (this.$router.currentRoute.name !== 'login') {
                            this.$store.commit('setRoute', this.$router.currentRoute)
                            this.$router.push('login')
                        }
                    })
                } else {
                    if (this.$router.currentRoute.name !== 'login') {
                        this.$store.commit('setRoute', this.$router.currentRoute)
                        this.$router.push('login')
                    }
                }
            }
        }
    }
}
