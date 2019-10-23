<template>
    <div>
        <div>
            <button type="button" class="btn btn-xs btn-primary pull-right" @click="resetForm">Nouveau</button>
        </div>
        <div class="fiche">
            <div v-if="value.id && !edit">
                <materielFiche v-model="value" />
            </div>
            <div v-else>
                <dyn-form :config="formControl" v-model="value" @commit="save" @remove="remove" />
            </div>
        </div>
    </div>
</template>
<script>
import {Notification} from 'uiv'
import {DynForm, FormController} from '@/components/tools/dynform'
import {MATERIEL_FORMCONFIG} from './formConfig'
import materielFiche from './fiche'

export default {
    name: 'materielForm',
    components: {DynForm, Notification, materielFiche},
    data () {
        return {
            config: MATERIEL_FORMCONFIG
        }
    },
    computed: {
        edit () {
            return this.$store.state.materiel.edit
        },
        value: {
            get () {
                // return this.$store.state.materiel.formValue
                return this.$store.getters['materiel/formValue']
            },
            set (data) {
                this.$store.commit('materiel/setFormValue', data)
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
        save (data) {
            this.$store.dispatch('materiel/save', data).then(() => {
                Notification.notify({
                    content: 'Données enregistrées',
                    placement: 'top-right',
                    type: 'success'
                })
                this.$emit('saved', data)
            }).catch(() => {
                Notification.notify({
                    content: 'Une erreur est survenue !',
                    placement: 'top-right',
                    type: 'danger'
                })
            })
        },
        remove (data) {
            this.$store.dispatch('materiel/remove', data).then(() => {
                Notification.notify({
                    content: 'Données supprimées',
                    placement: 'top-right',
                    type: 'success'
                })
                this.$emit('saved', data)
            }).catch(() => {
                Notification.notify({
                    content: 'Une erreur est survenue !',
                    placement: 'top-right',
                    type: 'danger'
                })
            })
        },
        resetForm () {
            this.$store.commit('materiel/resetForm')
            this.$emit('canceled')
        }
    }
}
</script>
<style scoped>
.fiche {
    padding: 5px;
    border: 1px solid #CCC;
    margin: 30px 10px;
}
</style>
