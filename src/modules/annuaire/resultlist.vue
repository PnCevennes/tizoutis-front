<template>
    <div class="resultlist">
        <h2>{{ltitle}}</h2>
        <div v-if="!value.length">Aucun résultat</div>
        <div class="results" v-if="correspondants.length">
            <toolbox v-model="correspondants" @toggled="toggleCorrespondants">
                Correspondants <span class="badge">{{correspondants.length}}</span>
            </toolbox>
            <div :key="item.id" v-for="item in correspondants" v-show="toggles.correspondant">
                <resultcard :value="item" @removed="removed"/>
            </div>
        </div>
        <div class="results" v-if="entreprises.length">
            <toolbox v-model="entreprises" @toggled="toggleEntreprises">
                Entreprises <span class="badge">{{entreprises.length}}</span>
            </toolbox>
            <div :key="item.id" v-for="item in entreprises" v-show="togges.entreprise">
                <resultcard :value="item" @removed="removed"/>
            </div>
        </div>
        <div class="results" v-if="communes.length">
            <toolbox v-model="communes" @toggled="toggleCommunes">
                Communes <span class="badge">{{communes.length}}</span>
            </toolbox>
            <div :key="item.id" v-for="item in communes" v-show="toggles.commune">
                <resultcard :value="item" @removed="removed"/>
            </div>
        </div>
        <div class="results" v-if="groupes.length">
            <h3>Groupes <span class="badge">{{groupes.length}}</span></h3>
            <div :key="item.id" v-for="item in groupes">
                <resultcard :value="item" @removed="removed"/>
            </div>
        </div>
    </div>
</template>
<script>
import {resultcard} from './resultcard'
import toolbox from './resultcard/cards/toolbox'

export default {
    name: 'resultlist',
    props: ['value', 'ltitle'],
    components: {
        resultcard,
        toolbox
    },
    data () {
        return {
            toggles: {
                correspondant: true,
                entreprise: true,
                commune: true
            }
        }
    },
    computed: {
        groupes () {
            return this.value.filter(x => x.type_entite === 'entite')
        },
        correspondants () {
            return this.value.filter(x => x.type_entite === 'correspondant')
        },
        communes () {
            return this.value.filter(x => x.type_entite === 'commune')
        },
        entreprises () {
            return this.value.filter(x => x.type_entite === 'entreprise')
        }
    },
    methods: {
        toggleCorrespondants () {
            this.toggles.correspondant = !this.toggles.correspondant
        },
        toggleCommunes () {
            this.toggles.commune = !this.toggles.commune
        },
        toggleEntreprises () {
            this.toggles.entreprise = !this.toggles.entreprise
        },
        removed (data) {
            console.log('resultlist removed')
            var idx = this.value.findIndex(x => x.id === data.id)
            this.value.splice(idx, 1)
        }
    }
}
</script>
<style scoped>
.resultlist {
    padding: 5px;
}
.results {
    padding: 5px;
    border: 1px solid #CCC;
}
h2, h3 {
    margin-bottom: 10px;
}
</style>
