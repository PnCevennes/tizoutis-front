<template>
    <span class="upload send">
        <label>
            <span :class="{'danger': dirty}">{{flabel}}</span>
            <input type="file" @change="select($event)" />
        </label>
        <progress :value="progression" min="0" max="100" v-show="progression>0"></progress>
    </span>
</template>
<script>
import axios from 'axios'

export default {
    name: 'Uploader',
    props: ['url', 'value'],
    data () {
        return {
            progression: 0,
            dirty: false
        }
    },
    computed: {
        flabel () {
            if (this.value) {
                return this.value
            } else {
                return 'Nouveau modèle'
            }
        }
    },
    methods: {
        select (upEvent) {
            if (!this.url) {
                this.$emit('input', upEvent.target.files[0])
                this.dirty = true
                this.value = upEvent.target.files[0].name
            } else {
                this.send(upEvent.target.files[0])
            }
        },
        send (file) {
            var form = new FormData()
            form.append('fichier', file)
            const updConf = {
                onUploadProgress: (evt) => {
                    this.progression = Math.round((evt.loaded / evt.total) * 100)
                }
            }
            axios.post(this.url, form, updConf).then(res => {
                this.progression = 0
                this.$emit('input', this.current)
            }).catch(() => {
                // TODO
            })
        }
    }
}
</script>
<style scoped>
input[type=file] {
    display: none;
}
</style>
