<template>
    <div class="fiche">
        <h1>{{copy.label}}</h1>
        <table class="table">
            <tr>
                <th>Nom</th>
                <td>
                    <input type="text" class="form-control" v-model="copy.nom" />
                </td>
            </tr>
            <tr>
                <th>Adresse</th>
                <td>
                    <input type="text" class="form-control" v-model="copy.adresse" />
                    <input type="text" class="form-control" v-model="copy.adresse2" />
                </td>
            </tr>
            <tr>
                <th>Code Postal</th>
                <td>
                    <input type="text" class="form-control" v-model="copy.code_postal" />
                </td>
            </tr>
            <tr>
                <th>Téléphone</th>
                <td>
                    <input type="text" class="form-control" v-model="copy.telephone" />
                </td>
            </tr>
            <tr>
                <th>Email</th>
                <td>
                    <input type="text" class="form-control" v-model="copy.email" />
                </td>
            </tr>
            <tr>
                <th>Site internet</th>
                <td>
                    <input type="text" class="form-control" v-model="copy.site_internet" />
                </td>
            </tr>
            <tr>
                <th>Observations</th>
                <td>
                    <textarea class="form-control" v-model="copy.observations"></textarea>
                </td>
            </tr>
            <tr>
                <th>groupes</th>
                <td>
                    <recherche v-model="copy.parents" :url="recherche_url" :format="formatListClbk" />
                </td>
            </tr>
            <tr v-if="copy.relations.length">
                <th>Éléments rattachés</th>
                <td>
                    <recherche v-model="copy.relations" :url="recherche_url" :format="formatListClbk" />
                </td>
            </tr>
        </table>
        <div class="toolbox">
            <button type="button" class="btn btn-xs btn-danger" v-if="copy.id" @click="remove">Supprimer</button>
            <div class="separator"></div>
            <div class="btn-group">
                <button type="button" class="btn btn-xs btn-default" @click="cancel">Annuler</button>
                <button type="button" class="btn btn-xs btn-success" @click="save">Enregistrer</button>
            </div>
        </div>
    </div>
</template>
<script>
import {FormMixin} from './commons'

export default {
    name: 'formCommune',
    mixins: [FormMixin]
}
</script>
<style>
</style>
