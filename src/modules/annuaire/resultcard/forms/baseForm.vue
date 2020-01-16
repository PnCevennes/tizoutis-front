<template>
    <div>
        <dyn-form :config="formControl" v-model="value" @commit="save" @remove="remove" />
    </div>
</template>
<script>
import axios from 'axios'
import {Notification, MessageBox} from 'uiv'
import {DynForm, FormController} from '@/components/tools/dynform'
import {SERVER} from '@/config'

export default {
    name: 'baseForm',
    props: ['value'],
    components: {
        DynForm
    },
    data () {
        var fc = new FormController(this.config, this.$store.state.user)
        fc.user_is_admin = true
        fc.show_buttons = true
        return {
            shown: false,
            formControl: fc
        }
    },
    computed: {
        httpInstance () {
            return axios.create({
                baseURL: SERVER,
                headers: {token: this.$store.state.userToken}
            })
        },
        postUrl () {
            if (this.value.id) {
                return '/annuaire/entite/' + this.value.id
            } else {
                return '/annuaire/entite'
            }
        }
    },
    methods: {
        save (data) {
            this.$store.commit('savingData')
            this.httpInstance.post(this.postUrl, data).then(resp => {
                Notification.notify({
                    content: 'Données enregistrées',
                    placement: 'top-right',
                    type: 'success'})
                this.$store.commit('dataSaved')
                this.$emit('changed', resp.data)
            }).catch(err => {
                this.$store.commit('dataSaved')
                Notification.notify({
                    content: 'Erreur d\'enregistrement',
                    placement: 'top-right',
                    type: 'danger'})
                console.log(err)
            })
        },
        remove (data) {
            MessageBox.confirm({
                title: "Suppression d'une fiche",
                content: 'Êtes vous certain de vouloir supprimer cette fiche ?'
            }).then(() => {
                this.$store.commit('savingData')
                this.httpInstance.delete(this.postUrl).then(resp => {
                    Notification.notify({
                        content: 'Données supprimées',
                        placement: 'top-right',
                        type: 'success'})
                    this.$store.commit('dataSaved')
                    this.$emit('removed', this.value)
                }).catch(err => {
                    this.$store.commit('dataSaved')
                    Notification.notify({
                        content: 'Erreur de suppression',
                        placement: 'top-right',
                        type: 'danger'})
                    console.log(err)
                })
            })
        },
        init () {
            this.formControl = new FormController(this.config, this.$store.state.user)
            this.formControl.user_is_admin = true
            this.formControl.show_buttons = true
            this.value.meta_update_user = this.$store.state.user.name
            this.value.meta_update_date = new Date()
        }
    },
    mounted () {
        this.init()
    }
}
</script>
