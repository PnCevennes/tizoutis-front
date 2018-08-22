<template>
    <div>
        <table class="dyntable">
            <tr>
                <th
                    v-for="field in controller.fields"
                    :key="field.name"
                    @click="controller.setSorting(field.name)"
                    title="cliquez pour trier"
                    >{{field.label}}&nbsp;&nbsp;<span
                        class="glyphicon"
                        :class="{'glyphicon-triangle-bottom': controller.sorting[field.name] == 1, 'glyphicon-triangle-top': controller.sorting[field.name] == -1}"></span></th>
            </tr>
            <tr>
                <th
                    :key="field.name"
                    v-for="field in controller.fields">
                    <input
                        type="text"
                        v-if="!field.nofilter"
                        :placeholder="field.filterLabel ? field.filterLabel : ''"
                        v-model="controller.filterData[field.name]"
                        @input="controller.update()" />
                </th>
            </tr>
            <tr
                :key="index"
                v-for="(line, index) in filteredData"
                class="selectable"
                :class="controller.lineStyle(line)"
                @click="controller.selectSingle(line)"
                @dblclick="controller.selectDouble(line)"
                >
                <td
                    :key="field.name"
                    v-for="field in controller.fields"
                    v-html="field.transform(line[field.name], line)">
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: 'dynTable',
    props: ['controller'],
    computed: {
        filteredData () {
            return this.controller.data
        }
    },
    mounted () {
        this.controller.directive = this
    },
    watch: {
        controller (nv) {
            nv.directive = this
        }
    }
}
</script>
