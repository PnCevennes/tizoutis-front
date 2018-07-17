<template>
    <div class="dynform-input">
        <div v-if="!config.is_hidden">
            <label :for="config.name" v-if="config.label">{{config.label}}</label>
            <span v-if="config.type=='hidden' && config.label">{{value}}</span>
            <input
                type="hidden"
                ref="input"
                v-if="config.type=='hidden'"
                :id="config.name"
                :value="value" />
            <input
                type="text"
                ref="input"
                v-if="config.type=='line'"
                :id="config.name"
                :value="value"
                @input="change($event.target)"
                :maxlength="config.maxlength"
                :minlength="config.minlength"
                :readonly="config.readonly"
                :placeholder="config.placeholder"
                :required="config.required" />
            <input
                type="password"
                ref="input"
                v-if="config.type=='password'"
                :id="config.name"
                :value="value"
                @input="change($event.target)"
                :required="config.required" />
            <input
                type="number"
                ref="input"
                v-if="config.type=='number'"
                :id="config.name"
                :value="value"
                @input="change($event.target)"
                :max="config.max"
                :min="config.min"
                :step="config.step"
                :readonly="config.readonly"
                :required="config.required" />
            <input
                type="date"
                ref="input"
                v-if="config.type=='date'"
                :id="config.name"
                :value="value"
                @input="change($event.target)"
                @changed="check($event.target)"
                :readonly="config.readonly"
                :required="config.required" />
            <input
                type="checkbox"
                ref="input"
                v-if="config.type=='bool'"
                :id="config.name"
                :checked="value"
                @change="input($event.target.checked)" />
            <select
                v-if="config.type=='select'"
                ref="input"
                :id="config.name"
                :readonly="config.readonly"
                @input="change($event.target)"
                :value="value">
                <option
                    :key="option.value"
                    v-for="option in config.choices"
                    :value="option.value">{{option.label}}</option>
            </select>
            <textarea
                v-if="config.type=='text'"
                ref="input"
                :value="value"
                @input="change($event.target)"
                :id="config.name"
                :readonly="config.readonly"
                :required="config.required"></textarea>
            <typeahead
                v-if="config.type=='autocomplete'"
                ref="input"
                :value="value"
                @input="input($event)"
                @validation="valid($event)"
                :config="config"
                />
            <repeated
                v-if="config.type=='repeated'"
                ref="input"
                :value="value"
                @input="input($event)"
                :config="config.config"
                />
            <checklist
                v-if="config.type=='checklist'"
                ref="input"
                :value="value"
                @input="input($event)"
                :config="config"
                />
            <upload v-if="config.type=='upload'"
                ref="input"
                :value="value"
                @input="input($event)"
                :config="config" />
            <div class="errmsg">
                <p>{{config.errmsg}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import typeahead from './typeahead'
import repeated from './repeated'
import checklist from './checklist'
import upload from './upload'

export default {
    name: 'field',
    props: ['config', 'value'],
    components: {
        typeahead,
        repeated,
        checklist,
        upload
    },
    methods: {
        input (evt) {
            if (this.config.triggerEvent) {
                this.$emit('event-triggered', [this.config.triggerEvent, evt])
            }
            this.$emit('input', evt)
        },
        valid (evt) {
            this.$emit('validation', [this.config.name, evt])
        },
        change (evt) {
            if (this.config.triggerEvent) {
                this.$emit('event-triggered', [this.config.triggerEvent, evt.value])
            }
            this.$emit('input', evt.value)
            this.$emit('validation', [this.config.name, evt.validity.valid])
        },
        checked (evt) {
            if (this.config.triggerEvent) {
                this.$emit('event-triggered', [this.config.triggerEvent, evt.checked])
            }
            this.$emit('input', evt.checked)
        },
        check (value) {
            if (this.config.validators) {
                var validations = this.config.validators.map(validate => { return validate(value) })
                if (!validations.every(x => x)) {
                    this.$refs.input.setCustomValidity('validation error')
                    this.$emit('validation', [this.config.name, false])
                } else {
                    this.$refs.input.setCustomValidity('')
                    this.$emit('validation', [this.config.name, true])
                }
            }
        }
    },
    mounted () {
        if (this.value !== undefined) {
            this.check(this.value)
        }
    },
    watch: {
        value (nv) {
            this.check(nv)
        }
    }
}
</script>
