import {MessageBox} from 'uiv'

export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            console.log(vm.groupAccept)
            if (!vm.$store.getters.isMember(vm.groupAccept)) {
                vm.$store.commit('setRoute', vm.$router.currentRoute.name)
                MessageBox.alert({
                    title: 'Alerte intrusion !',
                    content: "Vous n'avez pas les droits nécéssaires pour visiter cette section !"
                }, () => {
                    if (!this.$store.getters.isMember(this.groupAccept)) {
                        this.$router.push({name: 'login'})
                    } else {
                        this.init()
                    }
                })
                vm.$router.push({name: 'login'})
            }
        })
    }
}
