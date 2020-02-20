<template src="./recrutement.html" />
<script>
import {SERVER} from '@/config'
import {DynForm} from '@/components/tools/dynform'
import {DynTable, TableController} from '@/components/tools/dyntable'
import {demTable, headForm, reqForm} from './config'
import {GeneralMixin, AuthMixin} from '@/core/mixins'

export default {
    name: 'recrutement',
    components: {
        DynTable,
        DynForm
    },
    mixins: [AuthMixin, GeneralMixin],
    props: {
        query: {
            default: null
        }
    },
    computed: {
        dl_template () {
            if (this.form_content.id) {
                return [SERVER, this.ressourceUrl, this.form_content.id].join('/') + '?token=' + this.$store.state.userToken + '&format=document'
            } else {
                return '#'
            }
        }
    },
    data () {
        return {
            groupAdmin: 'tizoutis-recrutement',
            routeName: 'recrutement',
            ressourceUrl: 'recrutement',
            demTableCtrl: new TableController(demTable),
            userForm: [headForm, reqForm]
        }
    },
    methods: {
        _routeUpdatedClbk (to, from) {
            this.formCtrl.show_buttons = true
        }
    },
    mounted () {
        var metaCreateurFiche = headForm.fields.filter(x => x.name === 'meta_createur_fiche')[0]
        var notifList = headForm.fields.filter(x => x.name === 'notif_list')[0]
        metaCreateurFiche.default = this.user.name
        notifList.default = [this.user.mail]
    }
}
</script>
