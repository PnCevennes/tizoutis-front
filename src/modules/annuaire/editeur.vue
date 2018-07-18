<template>
    <div>
        <div class="row toolbtn">
            <dropdown v-if="user_is_auth">
                <btn type="primary" size="xs" class="dropdown-toggle">Nouveau</btn>
                <template slot="dropdown">
                    <li @click="createNew('entite')"><a role="button">Groupe</a></li>
                    <li @click="createNew('correspondant')"><a role="button">Correspondant</a></li>
                    <li @click="createNew('commune')"><a role="button">Commune</a></li>
                    <li @click="createNew('entreprise')"><a role="button">Entreprise</a></li>
                </template>
            </dropdown>
        </div>
        <div>
            <modal v-model="opened" :header="false" :footer="false" @hide="close" size="lg">
                <div v-if="!edit">
                    <fiche :fields="fields" :data="data" />
                    <div class="toolbox" v-if="!edit && !!data.type_entite">
                        <button type="button" v-if="user_is_auth" class="btn btn-xs btn-warning" @click="setEditMode">Editer</button>
                        <div class="separator"></div>
                        <button type="button" class="btn btn-xs btn-default pull-right" @click="close">Fermer</button>
                    </div>
                </div>
                <div class="form-container" v-else>
                    <form-groupe v-if="copy.type_entite==='entite'" :data="copy" @save="save($event)" @cancel="cancel" @remove="remove($event)" />
                    <form-correspondant v-if="copy.type_entite==='correspondant'" :data="copy" @save="save($event)" @cancel="cancel" @remove="remove($event)" />
                    <form-commune v-if="copy.type_entite==='commune'" :data="copy" @save="save($event)" @cancel="cancel" @remove="remove($event)" />
                    <form-entreprise v-if="copy.type_entite==='entreprise'" :data="copy" @save="save($event)" @cancel="cancel" @remove="remove($event)" />
                </div>
            </modal>
        </div>
    </div>
</template>
<script>
import {Dropdown, Btn, Modal} from 'uiv'
import {fiche, SCHEMAS} from './fiches/'
import {DEFAULTS, formCorrespondant, formCommune, formEntreprise, formGroupe} from './formulaires'

export default {
    name: 'editeur',
    props: ['data'],
    data () {
        return {
            copy: '',
            edit: false,
            opened: false
        }
    },
    computed: {
        fields () {
            return SCHEMAS[this.data.type_entite]
        },
        user_is_auth () {
            return this.$store.getters.isMember('tizoutis-annuaire')
        }
    },
    components: {
        Btn,
        Dropdown,
        Modal,
        fiche,
        formCorrespondant,
        formCommune,
        formGroupe,
        formEntreprise
    },
    methods: {
        createNew (type) {
            this.copy = {...DEFAULTS[type]}
            this.$emit('editing')
            this.edit = true
            this.opened = true
        },
        setEditMode () {
            this.copy = JSON.parse(JSON.stringify(this.data))
            this.edit = true
            this.opened = true
        },
        save (data) {
            this.$emit('save', data)
            this.edit = false
        },
        remove (data) {
            this.$emit('remove', data)
            this.edit = false
            this.opened = false
        },
        cancel () {
            this.copy = JSON.parse(JSON.stringify(this.data))
            this.edit = false
            this.opened = false
        },
        close () {
            this.opened = false
            this.$emit('close')
        }
    },
    mounted () {
        this.copy = JSON.parse(JSON.stringify(this.data))
    },
    watch: {
        data (v) {
            this.copy = JSON.parse(JSON.stringify(v))
            this.edit = false
            if (v.id) {
                this.opened = true
            }
        }
    }
}
</script>
