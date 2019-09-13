<template>
    <div class="card">
        <div class="card-header">
            <h3>{{value.label}}</h3>
            <button v-if="userIsAdmin" class="btn btn-xs btn-default" type="button" @click="edit=!edit"><span class="glyphicon glyphicon-cog"></span></button>
        </div>
        <entreprise-form v-model="value" v-if="edit" @changed="changed"  @removed="removed" />
        <div v-else>
            <div class="card-main">
                <div class="inline" v-if="value.telephone">
                    <span class="glyphicon glyphicon-earphone"></span> {{value.telephone}}
                </div>
                <div>
                    <span class="glyphicon glyphicon-envelope"></span> <a :href="'mailto:'+value.email">{{value.email}}</a>
                </div>
                <div v-if="value.site_internet">
                    <span class="glyphicon glyphicon-globe"></span> <a :href="value.site_internet" target="_blank">{{value.site_internet}}</a>
                </div>
            </div>
            <complementinfo v-model="value">
                <div v-if="value.nom_gerant || value.prenom_gerant">
                    <h5>Gérant</h5>
                    {{value.nom_gerant}} {{value.prenom_gerant}}
                </div>
                <div v-if="value.adresse">
                    <h5>Adresse</h5>
                    <div>{{value.adresse}}</div>
                    <div>{{value.adresse2}}</div>
                    <div>{{value.code_postal}}</div>
                </div>
                <div class="inline" v-if="value.telephone2">
                    <span class="glyphicon glyphicon-earphone"></span> {{value.telephone2}}
                </div>
                <div v-if="value.alt_email">
                    <span class="glyphicon glyphicon-envelope"></span> <a :href="'mailto:'+value.email">{{value.alt_email}}</a>
                </div>
            </complementinfo>
        </div>
    </div>
</template>
<script>
import complementinfo from './complementinfo'
import entrepriseForm from '../forms/entreprise'
import cardMixin from './cardMixin'

export default {
    name: 'entreprise',
    props: ['value'],
    components: {
        complementinfo,
        entrepriseForm
    },
    mixins: [
        cardMixin
    ]
}
</script>
