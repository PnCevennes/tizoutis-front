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
            <tr>
                <th>Éléments rattachés</th>
                <td>
                    <recherche v-model="copy.relations" :url="recherche_url" :format="formatListClbk" />
                </td>
            </tr>
        </table>
        <div class="toolbox">
            <div>
                <button type="button" class="btn btn-xs btn-danger" v-if="copy.id" @click="remove">Supprimer</button>
                <div class="pull-right">
                    <button type="button" class="btn btn-xs btn-default" @click="cancel">Annuler</button>
                    <button type="button" class="btn btn-xs btn-success" @click="save">Enregistrer</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {FormMixin} from './commons'

export default {
    name: 'formGroupe',
    mixins: [FormMixin]
}
</script>
