<template>
    <div class="card">
        <div class="card-header">
            <h3>{{value.label}}</h3>
            <button v-if="userIsAdmin" class="btn btn-xs btn-default" type="button" @click="edit=!edit"><span class="glyphicon glyphicon-cog"></span></button>
        </div>
        <commune-form v-model="value" v-if="edit" @changed="changed"  @removed="removed" />
        <div v-else>
            <div class="card-main">
                <div class="inline">
                    <span class="glyphicon glyphicon-earphone"></span> {{value.telephone}}
                </div>
                <div>
                    <a :href="'mailto:'+value.email">{{value.email}}</a>
                </div>
                <div>
                    <a :href="value.site_internet" target="_blank">{{value.site_internet}}</a>
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
import complementinfo from './complementinfo'
import communeForm from '../forms/commune'
import cardMixin from './cardMixin'

export default {
    name: 'commune',
    props: ['value'],
    components: {
        complementinfo,
        communeForm
    },
    mixins: [
        cardMixin
    ]
}
</script>
