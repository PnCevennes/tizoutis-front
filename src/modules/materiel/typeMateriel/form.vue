<template>
    <div>
        <button type="button" class="btn btn-xs btn-primary pull-right" @click="resetForm">Nouveau</button>
        <dyn-form :config="formControl" v-model="value" @commit="save" @remove="remove" />
    </div>
</template>
<script>
import {Notification} from 'uiv'
import {DynForm, FormController} from '@/components/tools/dynform'

var TYPEMATERIEL_FORMCONFIG = [{
    label: 'Type matériel',
    fields: [
        {
            name: 'id',
            label: 'ID',
            type: 'hidden'
        },
        {
            name: 'label',
            label: 'Nom',
            type: 'line'
        },
        {
            name: 'observations',
            label: 'Observations',
            type: 'text'
        }
    ]
}]

export default {
    name: 'typeMaterielForm',
    components: {DynForm},
    data () {
        return {
            config: TYPEMATERIEL_FORMCONFIG
        }
    },
    computed: {
        value: {
            get () {
                return this.$store.state.typeMateriel.formValue
            },
            set (data) {
                this.$store.commit('typeMateriel/setFormValue', data)
            }
        },
        formControl () {
            var fc = new FormController(
                this.config,
                this.$store.state.user
            )
            fc.user_is_admin = true
            fc.show_buttons = true
            return fc
        }
    },
    methods: {
        successClbk (data) {
            Notification.notify({
                content: 'Données enregistrées',
                placement: 'top-right',
                type: 'success'
            })
            this.$emit('saved', data)
        },
        errorClbk () {
            Notification.notify({
                content: 'Une erreur est survenue !',
                placement: 'top-right',
                type: 'danger'
            })
            console.log('type mat form error')
        },
        save (data) {
            var params = {
                data,
                success: this.successClbk,
                error: this.errorClbk
            }
            this.$store.dispatch('typeMateriel/save', params)
        },
        remove () {
            this.resetForm()
        },
        resetForm () {
            this.$store.commit('typeMateriel/resetForm')
            this.$emit('canceled')
        }
    }
}
</script>
