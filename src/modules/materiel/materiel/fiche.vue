<template>
    <div>
        <div class="titre">
            <h3>{{value.label}}</h3><button class="btn btn-xs btn-warning" type="button" @click="edit=!edit"><span class="glyphicon glyphicon-cog"></span></button>
        </div>
        <div class="item">
            <h4>Type</h4>
            <p>{{value.type_mat.label}}</p>
        </div>
        <div class="item">
            <h4>N°référence/série</h4>
            <p>{{value.reference}}</p>
        </div>
        <div class="item">
            <h4>Date d'ajout à l'inventaire</h4>
            <p>{{value.date_entree|datefr}}</p>
        </div>
        <div class="item" v-if="value.date_exclusion">
            <h4>Date de sortie de l'inventaire</h4>
            <p>{{value.date_exclusion|datefr}}</p>
        </div>
        <div class="item">
            <h4>Etat</h4>
            <p>{{value.etat}}</p>
        </div>
        <div class="item">
            <h4>Observations</h4>
            <p>{{value.observations}}</p>
        </div>
        <div>
            <affectationModule v-model="value.id" />
        </div>
    </div>
</template>
<script>
import affectationModule from '../affectation/affectation'

export default {
    name: 'materielFiche',
    props: ['value'],
    components: {
        affectationModule
    },
    filters: {
        datefr (data) {
            return data.split('-').reverse().join('/')
        }
    },
    computed: {
        edit: {
            get () {
                return this.$store.state.materiel.edit
            },
            set (val) {
                this.$store.commit('materiel/switchEdit', val)
            }
        }
    }
}
</script>
<style scoped>
.titre {
    display: flex;
}
.titre h3 {
    flex: 3;
}
.item {
    margin-top: 5px;
    display: flex;
}
.item h4 {
    width: 15em;
}
.item p {
    margin-left: 10px;
    flex: 3;
}
</style>
