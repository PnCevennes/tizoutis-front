<template>
    <div class="card">
        <div class="card-header">
            <h3>{{value.civilite}} {{value.label}}</h3>
            <button v-if="userIsAdmin" class="btn btn-xs btn-default" type="button" @click="edit=!edit"><span class="glyphicon glyphicon-cog"></span></button>
        </div>
        <correspondant-form v-model="value" v-if="edit" @changed="changed" @removed="removed" />
        <div v-else>
            <div class="card-main">
                <div>
                    {{value.fonction}}
                </div>
                <div class="inline">
                    <span class="glyphicon glyphicon-earphone"></span> {{value.telephone}}
                </div>
                <div class="inline" v-if="value.mobile">
                    <span class="glyphicon glyphicon-phone"></span> {{value.mobile}}
                </div>
                <div class="inline">
                    <a :href="'mailto:'+value.email"><span class="glyphicon glyphicon-envelope"></span>{{value.email}}</a>
                </div>
            </div>
            <complementinfo v-model="value">
                <div v-if="value.adresse">
                    <h5>Adresse</h5>
                    <div>{{value.adresse}}</div>
                    <div>{{value.adresse2}}</div>
                    <div>{{value.code_postal}}</div>
                </div>
            </complementinfo>
        </div>
    </div>
</template>
<script>
import correspondantForm from '../forms/correspondant'
import complementinfo from './complementinfo'
import cardMixin from './cardMixin'

export default {
    name: 'correspondant',
    components: {
        correspondantForm,
        complementinfo
    },
    mixins: [
        cardMixin
    ]
}
</script>
