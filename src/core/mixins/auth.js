export default {
    computed: {
        user () {
            return this.$store.state.user
        },
        userIsAdmin () {
            return this.$store.getters.isMember(this.groupAdmin)
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (!vm.$store.getters.isAuth) {
                vm.$store.commit('setRoute', vm.$router.currentRoute)
                vm.$store.commit('setAcceptedGroups', vm.groupAccept)
                vm.$router.push({name: 'login'})
            }
            if (!vm.$store.getters.isMember(vm.groupAccept)) {
                vm.$store.commit('setRoute', vm.$router.currentRoute)
                vm.$store.commit('setAcceptedGroups', vm.groupAccept)
                vm.$router.push({name: 'login', query: {err: 403}})
            }
        })
    }
}
