import axios from 'axios'
import {URLS, User} from '@/modules/login'

export default {
    mounted () {
        if (!this.$store.getters.isAuth) {
            var loginData = JSON.parse(window.localStorage.getItem('tizoutis-userdata'))
            console.log(loginData)
            if (loginData) {
                console.log('reco')
                this.$store.commit('savingData')
                var postdata = {id: loginData.uid, token: loginData.token}
                console.log(postdata)
                axios.post(URLS.reconnect, postdata).then((res) => {
                    this.$store.commit('setUser', new User(res.data))
                    this.$store.commit('dataSaved')
                }).catch((err) => {
                    console.error(err)
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
