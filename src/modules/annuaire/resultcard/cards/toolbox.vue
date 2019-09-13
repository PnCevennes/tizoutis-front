<template>
    <div class="tbx">
        <h3><slot></slot></h3>
        <div class="tb">
            <a class="btn btn-xs btn-primary" :href="mails"><span class="glyphicon glyphicon-envelope"></span></a>
            <copy-btn id="cp_mail_corresps" title="Copier la liste d'e-mails" css-class="btn btn-xs btn-success" v-model="mails" />
            <a class="btn btn-xs btn-warning" :href="csvLink" title="Exporter au format CSV"><span class="glyphicon glyphicon-download-alt"></span></a>
            <a class="btn btn-xs btn-info" :href="vcardLink" title="Exporter au format VCard"><span class="glyphicon glyphicon-phone"></span></a>
        </div>
    </div>
</template>
<script>
import copyBtn from '@/components/tools/copybtn'
import {SERVER} from '@/config'

export default {
    name: 'cardToolbox',
    props: ['value'],
    components: {
        copyBtn
    },
    computed: {
        mails () {
            return 'mailto:' + this.value.map(x => `${x.label} <${x.email}>`).join(',')
        },
        query () {
            return this.$route.query.s
        },
        csvLink () {
            var sp = this.getLink()
            sp.append('format', 'csv')
            return SERVER + '/annuaire/entites?' + sp.toString()
        },
        vcardLink () {
            var sp = this.getLink()
            sp.append('format', 'vcard')
            return SERVER + '/annuaire/entites?' + sp.toString()
        }
    },
    methods: {
        getLink () {
            var qr = typeof (this.$route.query.s) === 'object' ? this.$route.query.s : [this.$route.query.s]
            var sp = new URLSearchParams()
            qr.forEach(x => sp.append('params', x))
            sp.append('type', this.value[0].type_entite)
            sp.append('token', this.$store.state.userToken)
            return sp
        }
    }
}
</script>
<style scoped>
.tbx {
    display: flex;
}

.tbx h3 {
    flex: 10;
}
</style>
