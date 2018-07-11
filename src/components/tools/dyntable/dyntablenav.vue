<template>
    <div class="nav">
        <div class="navl">
            <button type="button" @click="controller.setPage(0)" :disabled="controller.page<1">&laquo;</button>
            <button type="button" @click="controller.pageDown()" :disabled="controller.page<1">&lsaquo;</button>
        </div>
        <div class="navc">
            {{controller.page+1}} / {{controller.pages}}
        </div>
        <div class="navr">
            <button type="button" @click="controller.pageUp()" :disabled="controller.page>=controller.pages-1">&rsaquo;</button>
            <button type="button" @click="controller.setPage(controller.pages-1)" :disabled="controller.page>=controller.pages-1">&raquo;</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dynTableNav',
    props: ['controller']
}
</script>
