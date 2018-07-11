<template>
    <span>
        <button title="copier" type="button" :class="cssClass" @click="copy_to_clipboard"><span class="glyphicon glyphicon-copy"></span></button>
        <div style="height: 0px; width: 0px; overflow: hidden;">
            <code :id="id">{{value}}</code>
        </div>
    </span>
</template>
<script>
export default {
    name: 'copyBtn',
    props: ['id', 'cssClass', 'value'],
    methods: {
        copy_to_clipboard () {
            var sel = window.getSelection()
            var tag = document.getElementById(this.id)
            sel.selectAllChildren(tag)
            document.execCommand('copy')
        }
    }
}
</script>
<style scoped>
div {
    display: inline-block;
}
</style>
