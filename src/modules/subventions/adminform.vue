<template>
    <div class="dynform">
        <div v-for="(item, index) in values" :key="index">
            <admin-form-line :line="item" :url="sourceUrl" @updated="lineUpdated()"></admin-form-line>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {SERVER} from '@/config'
import adminFormLine from './adminformline'

export default {
    name: 'adminForm',
    components: {
        adminFormLine
    },
    data () {
        return {
            values: [{}]
        }
    },
    computed: {
        sourceUrl () {
            return [SERVER, 'subventions', 'templates'].join('/')
        }
    },
    methods: {
        lineUpdated () {
            this.loadData()
        },
        loadData () {
            axios.get(this.sourceUrl).then(
                res => {
                    console.log('get subs')
                    this.values = [...res.data, {}]
                }
            ).catch(
                () => {
                    this.values = [{}]
                }
            )
        }
    },
    mounted () {
        console.log('admin mounted')
        this.loadData()
    }
}
</script>
