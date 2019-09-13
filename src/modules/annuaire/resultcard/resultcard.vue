<template>
    <div>
        <entite v-if="value.type_entite=='entite'" v-model="value" />
        <correspondant v-else-if="value.type_entite=='correspondant'" v-model="value" @removed="removed"/>
        <commune v-else-if="value.type_entite=='commune'" v-model="value" />
        <entreprise v-else-if="value.type_entite=='entreprise'" v-model="value" />
        <pre v-else>{{value}}</pre>
    </div>
</template>
<script>
import entite from './cards/entite'
import correspondant from './cards/correspondant'
import commune from './cards/commune'
import entreprise from './cards/entreprise'

export default {
    name: 'resultcard',
    props: ['value'],
    components: {
        entite,
        correspondant,
        commune,
        entreprise
    },
    methods: {
        removed (data) {
            console.log('resultcard removed')
            this.$emit('removed', data)
        }
    }
}
</script>
<style>
.inline {
    display: inline-block;
    margin-right: 10px;
}

.card {
    border-radius: 3px;
    border: 1px solid #CCC;
    padding: 5px;
    margin-top: 10px;
    box-shadow: 1px 1px 5px #CCC;
}

.card-header {
    display: flex;
}

.card-header h3 {
    flex: 10;
}

.card-main .glyphicon {
    margin-right: 10px;
}

.card-main h5 {
    margin-top: 5px;
}
</style>
