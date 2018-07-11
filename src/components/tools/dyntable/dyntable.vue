<template>
    <div>
        <table class="dyntable">
            <tr>
                <th
                    v-for="field in controller.fields"
                    :key="field.name"
                    @click="controller.setSorting(field.name)"
                    >{{field.label}}</th>
            </tr>
            <tr>
                <th
                    :key="field.name"
                    v-for="field in controller.fields">
                    <input
                        type="text"
                        v-if="!field.nofilter"
                        v-model="controller.filterData[field.name]"
                        @input="controller.update()" />
                </th>
            </tr>
            <tr
                :key="index"
                v-for="(line, index) in filteredData"
                class="selectable"
                :class="controller.lineStyle(line)"
                @click="controller.select(line)">
                <td
                    :key="field.name"
                    v-for="field in controller.fields">
                    {{field.transform(line[field.name])}}
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
