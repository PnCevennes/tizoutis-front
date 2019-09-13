<template>
    <div class="card">
        <div class="card-header">
            <h3>{{value.label}}</h3>
            <button v-if="userIsAdmin" class="btn btn-xs btn-default" type="button" @click="edit=!edit"><span class="glyphicon glyphicon-cog"></span></button>
        </div>
        <entite-form v-model="value" v-if="edit" @changed="changed"  @removed="removed" />
        <complementinfo v-model="value" v-else/>
    </div>
</template>
<script>
import complementinfo from './complementinfo'
import entiteForm from '../forms/entite'
import cardMixin from './cardMixin'

export default {
    name: 'entite',
    props: ['value'],
    components: {
        complementinfo,
        entiteForm
    },
    mixins: [
        cardMixin
    ]
}
</script>
