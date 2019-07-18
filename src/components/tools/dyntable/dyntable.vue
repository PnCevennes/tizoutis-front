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
                        :class="{'glyphicon-triangle-top': controller.sorting[field.name] == 1, 'glyphicon-triangle-bottom': controller.sorting[field.name] == -1}"></span></th>
            </tr>
            <tr>
                <th
                    :key="field.name"
                    v-for="field in controller.fields">
                    <div v-if="!field.nofilter">
                        <input
                            type="text"
                            v-if="!field.filterType || field.filterType === 'text'"
                            :placeholder="field.filterLabel ? field.filterLabel : ''"
                            v-model="controller.filterData[field.name]"
                            @input="controller.update()" />
                        <input
                            type="date"
                            v-if="field.filterType === 'date'"
                            :placeholder="field.filterLabel ? field.filterLabel : ''"
                            v-model="controller.filterData[field.name]"
                            @input="controller.update()" />
                        <select v-if="field.filterType === 'select'"
                                v-model="controller.filterData[field.name]"
                                @change="controller.update()" >
                                <option :key="option.value"
                                        v-for="option in field.choices"
                                        :value="option.value">
                                    {{option.label}}
                                </option>
                        </select>
                    </div>
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
<style scoped>
input[type=date]{
    font-weight: 100;
}
</style>
