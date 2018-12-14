<template>
    <div class="main-content">
        <h1 class="titlebar">Erreur !</h1>
        <div class="general-content">
            <p>{{msg}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Err404',
    data () {
        return {
            msg: "La page que vous avez demandée n'existe pas !"
        }
    }
}
</script>
