<template>
    <div>
        <input type="hidden" v-model="line.id" />
        <label>
            Nom
            <input type="text" v-model="line.name" />
        </label>
        <label>
            Libelle
            <input type="text" v-model="line.label" />
        </label>
        <label>
            <input type="checkbox" v-model="line.public">
            Public
        </label>
        <uploader class="dynform-input" :value="line.path" @input="check($event)" ref="uploader"></uploader>
        <button type="button" class="btn btn-success" @click="send"><span class="glyphicon glyphicon-ok"></span></button>
        <button type="button" class="btn btn-danger" v-if="line.id" @click="remove(line.id)"><span class="glyphicon glyphicon-remove"></span></button>
    </div>
</template>
<script>
import axios from 'axios'
import {SERVER} from '@/config'
import {Uploader} from '@/components/tools'

export default {
    name: 'adminFormLine',
    components: {
        Uploader
    },
    props: ['line', 'url'],
    data () {
        return {
            form: new FormData()
        }
    },
    computed: {
        uploaderUrl () {
            return [SERVER, 'subventions', 'templates'].join('/')
        }
    },
    methods: {
        remove (id) {
            axios.delete([this.url, id].join('/')).then(() => {
                this.$emit('updated')
            }).catch(() => {
                // TODO
            })
        },
        check (evt) {
            console.log('check')
            this.form.append('fichier', evt)
        },
        send () {
            const updConf = {
                onUploadProgress: (evt) => {
                    this.$refs.uploader.progression = Math.round((evt.loaded / evt.total) * 100)
                }
            }
            var key
            for (key in this.line) {
                if (this.line[key]) {
                    this.form.append(key, this.line[key])
                }
            }
            axios.post(this.url, this.form, updConf).then(res => {
                this.$refs.uploader.progression = 0
                this.$refs.uploader.dirty = false
                this.$emit('updated')
            }).catch(() => {
                // TODO
            })
        }
    }
}
</script>
