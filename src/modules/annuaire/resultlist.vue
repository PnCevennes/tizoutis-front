<template>
    <div class="resultlist">
        <h2>{{ltitle}}</h2>
        <div v-if="!value.length">Aucun résultat</div>
        <div class="results" v-if="correspondants.length">
            <toolbox v-model="correspondants">Correspondants</toolbox>
            <div :key="item.id" v-for="item in correspondants">
                <resultcard :value="item" @removed="removed"/>
            </div>
        </div>
        <div class="results" v-if="entreprises.length">
            <toolbox v-model="entreprises">Entreprises</toolbox>
            <div :key="item.id" v-for="item in entreprises">
                <resultcard :value="item" @removed="removed"/>
            </div>
        </div>
        <div class="results" v-if="communes.length">
            <toolbox v-model="communes">Communes</toolbox>
            <div :key="item.id" v-for="item in communes">
                <resultcard :value="item" @removed="removed"/>
            </div>
        </div>
        <div class="results" v-if="groupes.length">
            <h3>Groupes</h3>
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
