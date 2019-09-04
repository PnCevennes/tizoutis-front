<template>
    <span>
        <button :title="title" type="button" :class="cssClass" @click="copy_to_clipboard"><span class="glyphicon glyphicon-copy"></span></button>
        <div style="height: 1px; width: 1px; overflow: hidden;">
            <p :id="localId">{{value}}</p>
        </div>
    </span>
</template>
<script>
export default {
    name: 'copyBtn',
    props: ['id', 'cssClass', 'value', 'title'],
    computed: {
        localId () { return this.id + '_local' }
    },
    methods: {
        copy_to_clipboard () {
            var sel = window.getSelection()
            var tag = document.getElementById(this.localId)
            sel.selectAllChildren(tag)
            document.execCommand('copy')
        }
    }
}
</script>
<style scoped>
div {
    display: inline-block;
    margin-left: -4px;
}
</style>
