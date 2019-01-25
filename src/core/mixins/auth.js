export default {
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (!vm.$store.getters.isMember(vm.groupAccept)) {
                vm.$store.commit('setRoute', vm.$router.currentRoute)
                vm.$router.push({name: 'login', query: {err: 403}})
            }
        })
    }
}
