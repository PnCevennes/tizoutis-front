<template>
    <div>
        <div class="dynform">
            <fieldset :key="fset.label" v-for="fset in config.fieldsets">
                <legend>{{fset.label}}</legend>
                <div v-if="!fset.readonly || config.user_is_admin">
                    <field
                        class="form-row"
                        :key="item.name"
                        v-for="item in fset.fields"
                        v-if="visibleStatus[item.name]"
                        :config="item"
                        v-model="values[item.name]"
                        @validation="validate($event)"
                        @event-triggered="trigger($event)"/>
                </div>
                <table class="table" v-else>
                    <tr v-for="item in fset.fields" :key="item.name">
                        <th>{{item.label}}</th>
                        <td><info :config="item" :value="values[item.name]" /></td>
                    </tr>
                </table>
            </fieldset>
            <div class="toolbox" v-if="config.show_buttons">
                <button type="button" class="danger" v-if="config.user_is_admin && values.id" @click="remove">Supprimer</button>
                <div class="separator"></div>
                <div class="btn-group">
                    <button type="button" class="warning" @click="reset">RAZ</button>
                    <button type="button" class="success" :disabled="!valid" @click="commit">Enregistrer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Field from './field'
import Info from './info'

export default {
    name: 'dynForm',
    props: ['config', 'value'],
    data () {
        return {
            validationStatus: {},
            visibleStatus: {},
            values: {},
            valid: false
        }
    },
    methods: {
        trigger (evt) {
            this.$emit(evt[0], evt[1])
        },
        validate (evt) {
            this.validationStatus[evt[0]] = evt[1]
            this.valid = Object.values(this.validationStatus).every(x => x)
            this.config.fieldsets.forEach(fs => {
                fs.fields.forEach(f => {
                    if (f.condition) {
                        this.visibleStatus[f.name] = f.condition(this.values)
                    } else {
                        this.visibleStatus[f.name] = true
                    }
                })
            })
        },
        commit () {
            this.$emit('commit', this.values)
        },
        remove () {
            this.$emit('remove', this.values)
        },
        reset () {
            this.init(this.value)
        },
        init (values) {
            var defaults = {}
            this.config.fieldsets.forEach(fs => {
                fs.fields.forEach(cnf => {
                    if (cnf.condition) {
                        this.visibleStatus[cnf.name] = cnf.condition(this.value)
                    } else {
                        this.visibleStatus[cnf.name] = true
                    }
                    this.validationStatus[cnf.name] = !(cnf.required && !this.value[cnf.name])
                    if (cnf.type === 'checklist' || cnf.type === 'upload') {
                        defaults[cnf.name] = cnf.default ? cnf.default : []
                    } else if (cnf.type === 'repeated') {
                        defaults[cnf.name] = cnf.default ? cnf.default : ['']
                    } else if (cnf.type === 'bool') {
                        defaults[cnf.name] = !!cnf.default
                    } else {
                        defaults[cnf.name] = cnf.default ? cnf.default : ''
                    }
                })
            })
            this.values = {...defaults, ...values}
        }
    },
    components: {
        Field,
        Info
    },
    mounted () {
        if (this.value !== undefined) {
            this.init(this.value)
        } else {
            this.init({})
        }
    },
    watch: {
        value (nv) {
            this.init(nv)
        }
    }
}

</script>
