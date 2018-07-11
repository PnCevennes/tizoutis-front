<template>
    <div>
        <div
            class="repeated-item"
            v-for="(item, idx) in values"
            :key="idx">
            <div class="fieldbox">
                <field :config="config" v-model="values[idx]" @input="input" />
            </div>
            <div class="toolbox">
                <button
                    type="button"
                    class="btnbox-add"
                    @click="add"><span class="glyphicon glyphicon-plus"></span></button>
                <button
                    type="button"
                    class="btnbox-remove"
                    v-if="removable"
                    @click="remove(idx)"><span class="glyphicon glyphicon-minus"></span></button>
            </div>
        </div>
    </div>
</template>
<script>
import field from './field'

export default {
    name: 'repeated',
    props: ['config', 'value'],
    data () {
        return {
            values: []
        }
    },
    computed: {
        removable () {
            return this.values.length > 1
        }
    },
    methods: {
        add () {
            this.values.push('')
            this.$emit('input', this.values)
        },
        remove (idx) {
            this.values.splice(idx, 1)
            this.$emit('input', this.values)
        },
        input (value) {
            this.$emit('input', this.values)
        }
    },
    watch: {
        value (val) {
            if (!val.length) {
                val.push(this.config.default)
            }
            this.values = [...val]
        }
    },
    created () {
        /* fix bug initialisation component field */
        this.$options.components.field = field
    },
    mounted () {
        this.values = [...this.value]
        if (!this.value.length) {
            this.values.push(this.config.default)
        }
    }
}
</script>
<style scoped>
.repeated-item {
    width: 100%;
    display: flex;
}
.repeated-item .fieldbox{
    flex: 1;
    margin-right: 10px;
}
.repeated-item .btnbox {
    width: 150px;
}
</style>
