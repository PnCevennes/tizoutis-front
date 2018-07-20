<template>
    <div class="compo-recherche">
        <div :key="index" v-for="(item, index) in value" class="sline">
            <typeahead v-model="value[index]" :config="config" class="thd" />
            <div slot="btns" class="btns">
                <button type="button" @click="remove(index)" class="btn btn-xs btn-danger" v-if="value.length!==1"><span class="glyphicon glyphicon-minus"></span></button>
                <button type="button" @click="add" class="btn btn-xs btn-primary" v-if="index==(value.length-1)"><span class="glyphicon glyphicon-plus"></span></button>
            </div>
        </div>
    </div>
</template>
<script>
import {Typeahead} from '@/components/tools'

export default {
    name: 'recherche',
    components: {
        Typeahead
    },
    props: ['value', 'url', 'filters', 'format'],
    data () {
        return {
            config: {
                url: this.url,
                urlfilters: this.filters ? this.filters : '',
                formatListClbk: this.format,
                property: 'label',
                placeholder: 'Tapez votre recherche ici'
            }
        }
    },
    methods: {
        add () {
            this.value.push('')
        },
        remove (idx) {
            this.value.splice(idx, 1)
        }
    }
}
</script>
<style scoped>
.sline {
    margin-bottom: 5px;
    display: flex;
}
.thd {
    flex: 1;
}
.btns {
    margin-left: 5px;
}

</style>
