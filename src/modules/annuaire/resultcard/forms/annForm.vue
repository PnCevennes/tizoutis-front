<template>
    <div class="crea-form">
        <commune-form v-model="current" v-if="current.type_entite==='commune'" />
        <correspondant-form v-model="current" v-if="current.type_entite==='correspondant'" />
        <entite-form v-model="current" v-if="current.type_entite==='entite'" />
        <entreprise-form v-model="current" v-if="current.type_entite==='entreprise'" />
    </div>
</template>
<script>
import communeForm from './commune'
import correspondantForm from './correspondant'
import entiteForm from './entite'
import entrepriseForm from './entreprise'

export default {
    name: 'annForm',
    components: {
        communeForm,
        correspondantForm,
        entiteForm,
        entrepriseForm
    },
    data () {
        return {
            models: {
                commune: {type_entite: 'commune', nom: '', adresse: '', adresse2: '', code_postal: '', telephone: '', email: '', site_internet: '', ...this.base },
                correspondant: {type_entite: 'correspondant', nom: '', prenom:'', civilite: '', adresse: '', adresse2: '', code_postal: '', telephone: '', mobile: '', email: '', ...this.base},
                entite: {type_entite: 'entite', nom: '', ...this.base},
                entreprise: {type_entite: 'entreprise', nom: '', adresse: '', adresse2: '', code_postal: '', nom_gerant: '', prenom_gerant: '', telephone: '', telephone2: '', email: '', alt_email: '', site_internet: '', ...this.base}
            },
            current: {},
            base: {parents: [], relations: [], observations: ''}
        }
    },
    methods: {
        setForm (type) {
            this.current = {...this.models[type]}
        }
    }
}
</script>
<style scoped>
.crea-form {
    padding: 10px;
}
</style>
