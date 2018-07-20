<template>
    <div class="informations">
        <h3>Aucune recherche ou aucun résultat à afficher</h3><hr />
        <tabs>
            <tab title="Comment rechercher ?">
                <div style="border: 1px solid #ddd; border-top: none; padding: 1em;">
                    <p>Tapez votre recherche dans la barre du dessus et veillez bien à sélectionner un élément parmis ceux qui vous sont proposés. S'il n'y a aucune proposition en fonction de votre frappe, il ne sera pas possible de démarrer la recherche.</p>
                    <p>Vous pouvez rechercher directement sur le nom d'une personne ou d'une commune, ou rechercher par groupes. Par exemple une recherche sur PNC affichera tous les agents du Parc.</p>
                    <p>La liste de résultats affiche un résumé des informations diponibles pour chaque correspondant ou commune. Il suffit de cliquer sur un des résultats pour afficher des informations plus détaillées.</p>
                    <p class="text-danger">Les recherches se déclenchent à partir de 2 caractères saisis.</p>
                    <hr />
                    <h4>Affiner sa recherche</h4>
                    <p>Il est possible de saisir plusieurs critères de recherche en cliquant sur le bouton <span class="btn btn-xs btn-primary glyphicon glyphicon-plus"></span> situé à droite de la barre de recherche. Les résultats affichés seront alors ceux qui correspondent à tous les critères de recherche saisis.<p>
                    <p>Exemple : Une recherche sur PNC + SCVT + Aigoual n'affichera que les agents du SCVT du massif Aigoual.</p>
                    <p>Il est possible de supprimer les barres inutiles (ou des saisies fausses) en cliquant sur le bouton <span class="btn btn-xs btn-danger glyphicon glyphicon-minus"></span> situé à droite des barres de recherche.</p>
                    <p>Le bouton de recherche ne se débloque que lorsque toutes les critères de recherche sont des arguments valides.</p>
                    <hr />
                    <h4>Boutons utiles</h4>
                    <p>Plusieurs boutons sont affichés en tête de la colonne "Adresse email" :</p>
                    <ul class="list">
                        <li><span class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-envelope"></span></span> Permet de créer un nouveau message (en utilisant un client mail compatible comme thunderbird par exemple) avec pour destinataires tous les correspondants affichés. <span class="text-danger">Attention ! Cette option souffre d'une limitation sous Windows concernant le nombre de correspondants. Afin de contourner ce problème, il est possible d'utiliser le bouton <span class="btn btn-success btn-xs"><span class="glyphicon glyphicon-copy"></span></span></span>
                        </li>
                        <li>
                            <span class="btn btn-success btn-xs"><span class="glyphicon glyphicon-copy"></span></span> Permet de copier la liste d'e-mails afin de la coller directement dans votre client mail. Cette méthode permet de contourner la limitation rencontrée sous windows sur le nombre de correspondants ou de composer un e-mail avec plusieurs sources de correspondants, par exemple.
                        </li>
                        <li>
                            <span class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-download-alt"></span></span> Permet de télécharger la liste des correspondants au format CSV, utilisable dans LibreOffice ou les versions récentes de MS Office pour générer des listes de publipostage.
                        </li>
                        <li>
                            <span class="btn btn-info btn-xs"><span class="glyphicon glyphicon-phone"></span></span> Permet de télécharger la liste des correspondants affichés au format VCARD, pour ensuite l'importer dans votre client mail comme carnet d'adressse, ou dans votre téléphone mobile.
                        </li>
                    </ul>
                    <p>L'adresse email de chaque correspondant est cliquable et permet de créer un nouveau message avec le correspondant pour destinataire.</p>
                    <p>Double cliquez sur la ligne d'un résultat afin d'afficher les informations complètes.</p>
                </div>
            </tab>
            <tab title="Référents saisie">
                <div>&nbsp;</div>
                <table class="table table-striped table-condensed">
                    <tr>
                        <th colspan="6" class="bg-primary">Personnes chargées de la création de contacts</th>
                    </tr>
                    <tr>
                        <th>Nom</th>
                        <th colspan="5">Éléments saisis</th>
                    </tr>
                    <tr>
                        <td>Martine DELPUECH</td>
                        <td>Communes</td><td>Communautés de communes</td><td>Maires</td><td>Présidents</td><td>Élus référents</td>
                    </tr>
                    <tr>
                        <td>Catherine BERNARDI</td>
                        <td>Conseil d'administration</td><td colspan="4">Bureau</td>
                    </tr>
                    <tr>
                        <td>Carine THOMAS</td>
                        <td colspan="5">CESC</td>
                    </tr>
                    <tr>
                        <td>Rolande MARTELL</td>
                        <td>CS</td><td>Commission Biodiversité</td><td colspan="3">Commission Patrimoine Culturel</td>
                    </tr>
                    <tr>
                        <td>Carine LALLEMAND</td>
                        <td>Commission Architecture<br />Urbanisme Paysage</td><td>Commission Agriculture</td><td>Commission Forêt</td><td colspan="2">Commission Chasse</td>
                    </tr>
                    <tr>
                        <td>Catherine VAMBAIRGUE</td>
                        <td>Serre en Valats</td><td>Médias (presse, radio)</td><td colspan="3">Marqués</td>
                    </tr>
                    <tr>
                        <td>Bénédicte MICHEL</td>
                        <td>Commission EEDD Sensibilisation</td><td>Commission Tourisme</td><td>Offices de tourisme</td><td colspan="2">Relais d'information</td>
                    </tr>
                </table>
                <hr />
                <table class="table table-striped table-condensed table-bordered">
                    <tr>
                        <th colspan="4" class="bg-primary">Personnes chargées de la maintenance</th>
                    </tr>
                    <tr>
                        <th>Nom</th>
                        <th>Éléments saisis</th>
                    </tr>
                    <tr>
                        <td>Martine DELPUECH</td>
                        <td rowspan="2">Création de groupe</td>
                        <td rowspan="2">Modifications de la structure de la base</td>
                        <td rowspan="2">Toutes suppressions</td>
                    </tr>
                    <tr>
                        <td>Carine THOMAS</td>
                    </tr>
                    <tr>
                        <td>Catherine BERNARDI</td>
                        <td colspan="3" rowspan="5">Actualisation des données personnelles</td>
                    </tr>
                    <tr>
                        <td>Rolande MARTELL</td>
                    </tr>
                    <tr>
                        <td>Carine LALLEMAND</td>
                    </tr>
                    <tr>
                        <td>Catherine VAMBAIRGUE</td>
                    </tr>
                    <tr>
                        <td>Bénédicte MICHEL</td>
                    </tr>
                </table>
            </tab>
            <tab title="Comment saisir ?" v-if="user_is_auth">
                <div style="border: 1px solid #ddd; border-top: none; padding: 1em;">
                    <p>
                    Une fois connecté, il suffit de cliquer sur le bouton <span class="btn btn-xs btn-primary">Nouveau</span> et sélectionner le type d'élément que l'on souhaite créer.
                    </p>
                    <p>
                    Pour modifier un élément existant, il faut afficher le détail de l'élément puis cliquer sur <span class="btn btn-xs btn-warning">Editer</span> dans la fenetre de détail.
                    </p>
                    <hr />
                    <h4>Types d'éléments</h4>
                    <p>4 types d'éléments peuvent être saisis :
                    <ul class="list">
                        <li>Le groupe - l'élément le plus simple, qui n'est défini que par son nom.</li>
                        <li>Le correspondant - qui permet de saisir les informations relatives à une personne (nom, prenom, téléphone...).</li>
                        <li>La commune - qui permet de saisir des informations relatives à une commune (nom, adresse mairie, site internet...).</li>
                        <li>L'entreprise - pour les informations sur une entreprise.</li>
                    </ul>
                    </p>
                    <hr />
                    <h4>Groupes et éléments dépendants</h4>
                    <p>Le champ "Groupes" permet de saisir les éléments qui permettent de lister l'élement en cours de création.</p>
                    <p>Le champ "Éléments rattachés" permet de saisir les éléments qui seront listés lorsque la recherche portera sur l'élément en cours de création</p>
                    <hr />
                    <h4>Enregistrer</h4>
                    <p>Le bouton d'enregistrement <span class="btn btn-success btn-xs">Enregistrer</span> se situe en bas du formulaire de saisie. S'il est désactivé, c'est que la saisie comporte des erreurs. Les champs en erreur apparaissent alors entourés de rouge.</p>
                    <p>Le bouton <span class="btn btn-default btn-xs">Annuler</span> situé à coté ferme la fenètre de saisie sans enregistrer les changements.</p>
                    <hr />
                    <h4>Supprimer un élément</h4>
                    <p>Le bouton de suppression <span class="btn btn-danger btn-xs">Supprimer</span>
                    se situe en bas à gauche du formulaire de modification.</p>
                    <p>Supprimer un élément ne supprime pas les éléments qui lui sont liés. Chaque élément doit être supprimé explicitement.</p>
                    <hr />
                    <h4>Logique de l'annuaire</h4>
                    <p>Créer des relations entre les éléments permet de récupérer des listes filtrées selon une certaine logique. Sans relations, le seul filtrage possible est l'orthographe des noms.</p>
                    <p>La première chose à bien comprendre dans les relations entre les éléments, c'est que la notion de hiérarchie est très limitée. Chaque élément peut avoir un ou plusieurs éléments "parents", ou aucun. Et de la même manière, un, plusieurs, ou aucun élément "dépendant". Un élément dépendant d'un autre n'a par contre aucun rapport avec l'élément parent de celui ci.</p>
                    <p>Par exemple : SCVT est un groupe dépendant de PNC (le SCVT est un service du PNC après tout). Cependant, un élément peut être relié à SCVT sans pour autant être relié à PNC (cas d'un prestataire extérieur par exemple).</p>
                    <p class="text-primary">Les relations indirectes n'existent pas, chaque relation doit être saisie de manière explicite.</p>
                    <p>Il est très important de choisir judicieusement les relations de chaque élément, de manière à ce qu'une recherche soit évidente pour n'importe quel utilisateur, et que les possibilités de filtrage permettent de réduire au maximum le nombre de résultats</p>
                    <p>L'élément de base pour filtrer des résultats est le groupe (il porte bien son nom). Cependant il faut savoir que n'importe quel élément peut être utilisé. Un élément de type "Commune" peut être logiquement utilisé comme "parent" pour des "Correspondants". Mais un élément de type "Correspondant" pourrait également servir de la même manière, même si c'est plutôt à déconseiller.</p>
                </div>
            </tab>
        </tabs>
    </div>
</template>
<script>
import {Tabs, Tab} from 'uiv'
export default {
    name: 'informations',
    components: {
        Tabs,
        Tab
    },
    computed: {
        user_is_auth () {
            return this.$store.getters.isMember('tizoutis-annuaire')
        }
    }
}
</script>
