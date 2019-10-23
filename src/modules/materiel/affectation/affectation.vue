<template>
    <div>
        <div class="aff-list" v-if="affectations.length">
            <h3>Affectations</h3>
            <div class="items" v-for="item in affectations" :key="item.id" @click="select(item)">
                {{item.date_affectation|datefr}} par {{item.utilisateur}}
                <span class="retour" v-if="item.date_retour">rendu le {{item.date_retour|datefr}}</span>
                <span class="affecte" v-else> (affectation actuelle)</span>
            </div>
        </div>
        <div class="aff-form">
            <h3 v-if="current.id">Affectation actuelle</h3>
            <h3 v-else>Nouvelle affectation</h3>
            <div>
                <dyn-form class="dyn-form" :config="formControl" v-model="current" @commit="save" @remove="remove" />
            </div>
        </div>
    </div>
</template>
<script>
import {Notification} from 'uiv'
import {DynForm, FormController} from '@/components/tools/dynform'
import {FORMCONFIG} from './formConfig'

export default {
    name: 'affectationModule',
    props: ['value'],
    components: {DynForm},
    filters: {
        datefr (val) {
            return val.split('-').reverse().join('/')
        }
    },
    data () {
        return {
            formConfig: FORMCONFIG
        }
    },
    computed: {
        affectations () {
            return [...this.$store.state.affectationMat.affectationsList].reverse()
        },
        current () {
            return this.$store.getters['affectationMat/getCurrentAffectation']
        },
        formControl () {
            var fc = new FormController(
                this.formConfig,
                this.$store.state.user
            )
            fc.user_is_admin = true
            fc.show_buttons = true
            return fc
        }
    },
    methods: {
        init () {
            this.$store.dispatch('affectationMat/getList', this.value)
        },
        save (data) {
            this.$store.dispatch('affectationMat/save', data).then(() => {
                Notification.notify({
                    content: 'Données enregistrées',
                    placement: 'top-right',
                    type: 'success'
                })
            }).catch(() => {
                Notification.notify({
                    content: 'Une erreur est survenue !',
                    placement: 'top-right',
                    type: 'danger'
                })
            })
        },
        remove (data) {
            this.$store.dispatch('affectationMat/remove', data).then(() => {
                Notification.notify({
                    content: 'Données supprimées',
                    placement: 'top-right',
                    type: 'success'
                })
            }).catch(() => {
                Notification.notify({
                    content: 'Une erreur est survenue !',
                    placement: 'top-right',
                    type: 'danger'
                })
            })
            console.log('remove')
        },
        select (data) {
            this.$store.commit('affectationMat/setCurrent', data)
        }
    },
    mounted () {
        this.init()
    }
}
</script>
<style scoped>
.aff-list, .aff-form {
    margin: 30px 50px;
    border: 1px solid #DDD;
    border-radius: 3px;
    box-shadow: 2px 2px 8px #CCC;
}
.aff-list h3, .aff-form h3 {
    padding: 5px 15px;
    background-color: #52F;
    color: white;
    margin-bottom: 5px;
    border-radius: 3px 3px 0 0;
}
.aff-list .items {
    padding: 5px;
    cursor: pointer;
}
.aff-list .items:hover {
    background-color: #DDD;
}
.aff-list .retour {
    color: #52f;
}
.aff-list .affecte {
    color: #f25;
}
.aff-form .dyn-form {
    padding: 5px;
}
</style>
