<template>
    <div>
        <ul class="upload">
            <li v-for="fichier in fichiers" :key="fichier.id">
                <a :href="getUrl(fichier.file_uri)" target="_blank">{{fichier.filename}}</a>
                <div class="toolbox">
                    <button v-if="config.globalConf.user_is_admin" class="danger" @click="remove(fichier)"><span class="glyphicon glyphicon-minus"></span></button>
                </div>
            </li>
            <li class="send">
                <label :for="config.name">Sélectionner un fichier</label>
                <progress :value="progression" min="0" max="100"></progress>
                <input type="file" :id="config.name" @change="send($event)" />
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'Upload',
    props: ['config', 'value'],
    data () {
        return {
            fichiers: [],
            progression: 0
        }
    },
    methods: {
        send (evt) {
            var formContent = new FormData()
            formContent.append('fichier', evt.target.files[0])
            const updConf = {
                onUploadProgress: (evt) => {
                    this.progression = Math.round((evt.loaded / evt.total) * 100)
                }
            }
            axios.post(this.config.uploadTarget, formContent, updConf).then(res => {
                this.fichiers.push(res.data)
                this.progression = 0
                this.$emit('input', this.fichiers)
            }).catch(() => {
                // TODO
            })
        },
        remove (fichier) {
            axios.delete(this.config.uploadTarget + '/' + fichier.id).then(res => {
                this.fichiers.splice(this.fichiers.indexOf(fichier), 1)
            }).catch(() => {})
        },
        getUrl (uri) {
            return this.config.uploadDir + uri
        }
    },
    watch: {
        value (nv) {
            this.fichiers = [...nv]
        }
    },
    mounted () {
        this.fichiers = [...this.value]
    }
}
</script>
