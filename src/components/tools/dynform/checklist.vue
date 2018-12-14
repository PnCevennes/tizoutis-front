<template>
    <div>
            <ul class="checklist">
                <li v-for="item in choices" :key="item.value">
                <label>
                    <input type="checkbox" @change="check(item)" :checked="values.indexOf(item.value) > -1" />
                    {{item.label}}
                </label>
                </li>
            </ul>
        <input type="text" ref="input" style="height: 0" />
        <div class="errmsg">
            <p>{{errmsg}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'checkList',
    props: ['config', 'value'],
    data () {
        return {
            values: this.value ? [...this.value] : [],
            errmsg: this.config.errmsg
        }
    },
    computed: {
        choices () {
            return this.config.choices.filter(x => x.value !== undefined)
        }
    },
    methods: {
        check (item) {
            var idx = this.values.indexOf(item.value)
            if (idx > -1) {
                this.values.splice(idx, 1)
            } else {
                this.values.push(item.value)
            }
            this.$emit('input', this.values)
        },
        setCustomValidity (msg) {
            this.$refs.input.setCustomValidity(msg)
        },
        init (nv) {
            if (!nv) {
                nv = []
            }
            if (this.config.validators) {
                var validations = this.config.validators.map(validate => { return validate(nv) })
                if (!validations.every(x => x)) {
                    this.$refs.input.setCustomValidity('validation error')
                    this.$emit('validation', [this.config.name, false])
                } else {
                    this.$refs.input.setCustomValidity('')
                    this.$emit('validation', [this.config.name, true])
                }
            }
            this.values = [...nv]
        }
    },
    watch: {
        value (nv) {
            this.init(nv)
        }
    },
    mounted () {
        this.init(this.value)
    }
}
</script>
