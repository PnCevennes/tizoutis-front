<template>
    <div
        @keyup.down="idxup()"
        @keyup.up="idxdwn()"
        @keyup.right="selectCur()"
        @keyup.enter="selectCur()"
        @keypress.tab="selectCur()"
        @keyup.tab="selectCur()"
        >
        <input
            type="text"
            ref="input"
            :value="formattedValue"
            :placeholder="placeholder"
            @input="search($event.target.value)"
            :class="{'invalid': invalid}"
            />
        <ul
            :class="{panvisible: formattedSearchRes.length}"
            ref="selector"
            >
             <li
                :key="index"
                v-for="(item, index) in formattedSearchRes"
                @click="select(index)"
                :class="{current: index==idx}"
                v-html="item"
                ></li>
        </ul>
        <div :class="{'errmsg': invalid, 'errmsg-off': !invalid}">
            {{config.errmsg}}
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'typeahead',
    props: {
        config: Object,
        value: [Object, String]
    },
    data () {
        return {
            searchRes: [],
            idx: 0,
            invalid: this.config.required && !this.value
        }
    },
    computed: {
        isPanVisible () {
            return false
        },
        placeholder () {
            return this.config.placeholder !== undefined ? this.config.placeholder : ''
        },
        formattedSearchRes () {
            var out = this.searchRes.map(
                x => {
                    if (this.config.formatListClbk) {
                        return this.config.formatListClbk(x)
                    }
                    return this.getFormattedValue(x)
                }
            )
            return out
        },
        formattedValue () {
            return this.getFormattedValue(this.value)
        },
        validity () {
            return {valid: !this.invalid}
        }
    },
    methods: {
        getFormattedValue (value) {
            if (this.config.property && value[this.config.property]) {
                return value[this.config.property]
            }
            return value
        },
        selectCur () {
            this.select(this.idx)
        },
        select (idx) {
            var value = this.searchRes[idx]
            if (value === undefined) {
                return
            }
            this.searchRes.splice(0)
            this.invalid = false
            this.$emit('input', value)
            this.$emit('validation', !this.invalid)
        },
        idxup () {
            if (this.idx < this.searchRes.length - 1) {
                this.idx++
            } else {
                this.idx = 0
            }
        },
        idxdwn () {
            if (this.idx > 0) {
                this.idx--
            } else {
                this.idx = this.searchRes.length - 1
            }
        },
        search (value) {
            if (!this.config.urlfilters) {
                this.config.urlfilters = ''
            }
            if (value.trim().length > 1) {
                this.$store.commit('loadingData')
                axios.get(this.config.url + value.trim() + this.config.urlfilters).then(
                    res => {
                        this.$store.commit('dataLoaded')
                        this.searchRes = res.data
                        this.invalid = this.config.required
                        this.idx = 0
                    }
                ).catch(
                    err => {
                        this.searchRes.splice(0)
                        console.log(err)
                    }
                )
            } else {
                this.searchRes.splice(0)
                this.idx = 0
            }
            this.$emit('input', value)
            this.$emit('validation', !this.invalid)
        },
        setValue (v) {
            this.$emit('input', v)
        }
    },
    watch: {
        value (v) {
            if (v === undefined) {
                this.$emit('input', '')
            }
        }
    }
}
</script>
<style scoped>
input {
    width: 100%;
    border: 0;
    outline: 0;
    border-bottom: 2px solid #CCCCFF;
    float: left;
    box-shadow: none;
}

input:focus {
    box-shadow: none;
}

.invalid {
    border-bottom: 2px solid #FF0000;
}

ul {
    margin: 0;
    padding: 0;
    max-height: 0;
    list-style-type: none;
    margin-top: 30px;
    background-color: white;
    position: absolute;
    clear: both;
    min-width: 30%;
    overflow: auto;
    box-shadow: 0px 5px 5px grey;
    z-index: 100;
}

li {
    padding: 7px 2em 7px 5px;
    border: 2px solid white;
    border-left: 5px solid white;
    cursor: pointer;
}

li:hover {
    border-left: 5px solid darkorange;
}

.panvisible {
    max-height: 100%;
    padding: 10px 0;
    border-left: 4px solid darkorange;
}

.current {
    background-color: blue;
    color: white;
}

.errmsg {
    margin: 0;
    padding: 0;
    margin-top: 0px;
    text-align: right;
    font-size: 0.8rem;
    color: red;
}

.errmsg-off {
    visibility: hidden;
}
</style>
