<template src="./interventions.html" />
<script>
import {DynForm} from '@/components/tools/dynform'
import {DynTable, TableController} from '@/components/tools/dyntable'
import {demTable, reqForm, planForm, reaForm} from './config'
import {GeneralMixin, AuthMixin} from '@/core/mixins'

export default {
    name: 'interventions',
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
    data () {
        return {
            groupAdmin: 'tizoutis-interventions',
            routeName: 'interventions',
            ressourceUrl: 'interventions',
            demTableCtrl: new TableController(demTable),
            userForm: [reqForm, planForm, reaForm]
        }
    },
    methods: {
        hide_finished (evt) {
            this.hideFinished = evt.target.checked
            if (evt.target.checked) {
                this.demTableCtrl.filterData['rea_date'] = true
                this.demTableCtrl.filters['rea_date'] = (v) => v === null
                this.demTableCtrl.filterData['rea_annulation'] = true
                this.demTableCtrl.filters['rea_annulation'] = (v) => !v
            } else {
                this.demTableCtrl.filterData['rea_date'] = false
                this.demTableCtrl.filterData['rea_annulation'] = false
            }
            this.demTableCtrl.update()
            if (this.form_content.id) {
                var res = this.demTableCtrl.search('id', this.form_content.id)
                this.demTableCtrl.select(res, true)
            }
        }
    },
    mounted () {
        var dmdr = reqForm.fields.filter(x => x.name === 'dmdr_contact_nom')[0]
        dmdr.default = this.user.name
        var dmdrMail = reqForm.fields.filter(x => x.name === 'dmdr_contact_email')[0]
        dmdrMail.default = [this.user.mail]
        var dmdrService = reqForm.fields.filter(x => x.name === 'dmdr_service')[0]
        try {
            dmdrService.default = dmdrService.choices.find(v => this.user.groups.indexOf(v.label) !== -1).id
        } catch (e) {
            dmdrService.default = null
        }
    }
}
</script>
