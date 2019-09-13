export default {
    props: ['value'],
    data () {
        return {edit: false}
    },
    computed: {
        userIsAdmin () {
            return this.$store.getters.isMember(['tizoutis-annuaire'])
        }
    },
    methods: {
        changed (data) {
            this.value = data
            this.edit = false
        },
        removed (data) {
            this.$emit('removed', data)
        }
    }
}
