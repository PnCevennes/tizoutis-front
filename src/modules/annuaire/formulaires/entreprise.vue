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
                <th>Nom du contact</th>
                <td>
                    <input type="text" class="form-control" v-model="copy.nom_gerant" placeholder="Nom" />
                    <input type="text" class="form-control" v-model="copy.prenom_gerant" placeholder="Prénom" />
                </td>
            </tr>
            <tr>
                <th>Fonction</th>
                <td>
                    <input type="text" class="form-control" v-model="copy.fonction_gerant" />
                </td>
            </tr>
            <tr>
                <th>Téléphone</th>
                <td>
                    <input type="text" class="form-control" v-model="copy.telephone" />
                    <input type="text" class="form-control" v-model="copy.telephone2" />
                </td>
            </tr>
            <tr>
                <th>Email</th>
                <td>
                    <input type="text" class="form-control" v-model="copy.email" placeholder="Principal"/>
                    <input type="text" class="form-control" v-model="copy.alt_email" placeholder="Secondaire" />
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
    name: 'formEntreprise',
    mixins: [FormMixin]
}
</script>
<style>
h1 {
    border-bottom: 2px solid darkorange;
    margin-bottom: 1ex;
}
td, th {
    padding: 5px;
    vertical-align: top;
}
tr {
    border-top: 1px solid lightgrey;
}
tr:first-of-type {
    border-top: none;
}
</style>
