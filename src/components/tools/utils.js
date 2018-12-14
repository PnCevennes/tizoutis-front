import axios from 'axios'
import {SERVER} from '@/config'

var datefr = (dte) => {
    if (dte && dte !== 'None') {
        var theDate = new Date(dte)
        return [
            String(theDate.getDate()).padStart(2, '0'),
            String(theDate.getMonth() + 1).padStart(2, '0'),
            String(theDate.getFullYear())
        ].join('/')
    }
    return ''
}

class Thesaurus {
    constructor () {
        this.cache = {}
    }
    getThesaurusRef (idRef, config, fieldName) {
        axios.get(SERVER + '/thesaurus/ref/' + idRef).then(res => {
            var item = config.fields.find(itm => itm.name === fieldName)
            item.choices = res.data.map(v => {
                v.value = v.id
                this.cache[v.id] = v.label
                return v
            })
            item.choices.unshift({0: ''})
        }).catch(err => { console.error(err) })
    }
    getLabel (idRef) {
        if (this.cache[idRef]) {
            return this.cache[idRef]
        } else {
            axios.get(SERVER + '/thesaurus/id/' + idRef).then(res => {
                this.cache[res.data.id] = res.data.label
                return res.data.label
            })
        }
    }
}

class RefGeo {
    constructor () {
        this.cache = {
            communes: {},
            batiments: {commune: {}}
        }
    }

    getCommunes (config, fieldName) {
        axios.get(SERVER + '/refgeo/commune').then(res => {
            var item = config.fields.filter(itm => itm.name === fieldName)[0]
            item.choices = []
            res.data.forEach(v => {
                v.value = v.id
                this.cache.communes[v.id] = v.label
                item.choices.push(v)
            })
        }).catch(err => { console.log(err) })
    }

    getCommuneLabel (id) {
        return this.cache.communes[id]
    }

    getAllBatiments () {
        axios.get(SERVER + '/refgeo/batiment').then(res => {
            res.data.forEach(bat => {
                if (this.cache.batiments.commune[bat.ref_commune] === undefined) {
                    this.cache.batiments.commune[bat.ref_commune] = []
                }
                this.cache.batiments.commune[bat.ref_commune].push({value: bat.id, label: bat.label})
                this.cache.batiments[bat.id] = {value: bat.id, label: bat.label}
            })
        }).catch(err => { console.log(err) })
    }

    getBatiments (id, config, fieldName) {
        var item = config.fields.filter(itm => itm.name === fieldName)[0]
        item.choices = this.cache.batiments.commune[id]
        return item.choices
    }

    getBatimentLabel (id) {
        return this.cache.batiments[id].label
    }
}

export {Thesaurus, RefGeo, datefr}
