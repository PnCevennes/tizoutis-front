<template>
    <div>
        <div v-if="config.type=='date'">
            {{value|datefr}}
        </div>
        <div v-if="config.type=='line'||config.type=='text'||config.type=='number'">
            {{value}}
        </div>
        <div v-if="config.type=='select'">
            {{select}}
        </div>
        <div v-if="config.type=='autocomplete'">
            {{value}}
        </div>
        <div v-if="config.type=='upload'">
            <ul>
                <li v-for="item in value" :key="item.id">
                    <a :href="config.uploadDir + item.file_uri" target="_blank">{{item.filename}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {datefr} from '@/components/tools/utils'

export default {
    name: 'formInfo',
    props: ['config', 'value'],
    filters: {
        datefr
    },
    computed: {
        select () {
            try {
                return this.config.choices.find(x => x.value === this.value).label
            } catch (err) {
                return ''
            }
        }
    }
}
</script>
