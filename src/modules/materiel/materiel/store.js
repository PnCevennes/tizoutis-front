function dateFormat (dte) {
    return dte.getFullYear() + '-' + (dte.getMonth() + 1).toString().padStart(2, '0') + '-' + dte.getDate()
}

export default {
    namespaced: true,
    state: {
        formValue: {
            id: '',
            label: '',
            type_mat: '',
            reference: '',
            disponible: true,
            date_entree: dateFormat(new Date()),
            date_exclusion: '',
            etat: '',
            observations: ''
        },
        matList: [],
        edit: false
    },
    getters: {
        matList (state) {
            return state.matList
        },
        formValue (state) {
            return state.formValue
        }
    },
    mutations: {
        switchEdit (state, value) {
            state.edit = value
        },
        setMatList (state, values) {
            values.map(val => {
                val.type_mat = this.getters['typeMateriel/getItemByID'](val.type_mat)
            })
            state.matList = values
        },
        setFormValue (state, value) {
            var typeMat = this.getters['typeMateriel/getItemByID'](value.type_mat)
            value.type_mat = typeMat
            state.formValue = value
            state.edit = false
        },
        updateListElement (state, value) {
            var lst = [...state.matList]
            var elemIdx = lst.findIndex(x => x.id === value.id)
            if (elemIdx > -1) {
                lst[elemIdx] = value
            } else {
                lst.push(value)
            }
            state.matList = [...lst]
        },
        deleteListElement (state, value) {
            var elemIdx = state.matList.findIndex(x => x.id === value.id)
            state.matList.splice(elemIdx, 1)
        },
        resetForm (state) {
            state.formValue = {
                id: '',
                label: '',
                type_mat: '',
                reference: '',
                disponible: true,
                date_entree: dateFormat(new Date()),
                date_exclusion: '',
                etat: '',
                observations: ''
            }
        }
    },
    actions: {
        getList ({commit, state, rootGetters}, types) {
            return new Promise((resolve, reject) => {
                commit('loadingData', null, {root: true})
                var url = '/materiel/'
                if (types) {
                    var items = new URLSearchParams()
                    types.map(x => items.append('itemType', x))
                    url += '?' + items
                }
                rootGetters.httpInstance.get(url).then(resp => {
                    commit('setMatList', resp.data)
                    resolve(state.matList)
                }).catch(err => {
                    reject(err)
                }).finally(() => {
                    commit('dataLoaded', null, {root: true})
                })
            })
        },
        getOne ({commit, rootGetters}, params) {
            return new Promise((resolve, reject) => {
                commit('loadingData', null, {root: true})
                rootGetters.httpInstance.get('materiel/' + params.id).then(resp => {
                    resolve(resp.data)
                }).catch(err => {
                    reject(err)
                }).finally(() => {
                    commit('dataLoaded', null, {root: true})
                })
            })
        },
        save ({commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                commit('savingData', null, {root: true})
                var postUrl = '/materiel/'
                if (data.id !== '') {
                    postUrl += data.id
                }
                rootGetters.httpInstance.post(postUrl, data).then(resp => {
                    commit('updateListElement', resp.data)
                    commit('setFormValue', resp.data)
                    commit('switchEdit', false)
                    resolve(resp.data)
                }).catch(err => {
                    reject(err)
                }).finally(() => {
                    commit('dataSaved', null, {root: true})
                })
            })
        },
        remove ({commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                commit('savingData')
                rootGetters.httpInstance.delete('/materiel/' + data.id).then(resp => {
                    commit('deleteListElement', resp.data)
                    resolve(resp.data)
                }).catch(err => {
                    reject(err)
                }).finally(() => {
                    commit('dataSaved')
                })
            })
        },
        updateDispo ({commit, rootGetters}, data) {
            return new Promise((resolve, reject) => {
                rootGetters.httpInstance.put('/materiel/' + data.id_materiel, data).then(resp => {
                    commit('updateListElement', resp.data)
                    resolve(resp.data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}
