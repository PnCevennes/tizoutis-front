export default {
    namespaced: true,
    state: {
        formValue: {id: '', label: '', observations: ''},
        typeMatList: []
    },
    getters: {
        getItemByID: (state) => (id) => {
            return state.typeMatList.find(x => x.id === id)
        },
        getList (state) {
            return state.typeMatList
        }
    },
    mutations: {
        setList (state, values) {
            state.typeMatList = values
        },
        setFormValue (state, value) {
            state.formValue = value
        },
        updateListElement (state, value) {
            var lst = [...state.typeMatList]
            var elemIdx = lst.findIndex(x => x.id === value.id)
            if (elemIdx > -1) {
                lst[elemIdx] = value
            } else {
                lst.push(value)
            }
            state.typeMatList = [...lst]
        },
        resetForm (state) {
            state.formValue = {id: '', label: '', observations: ''}
        }
    },
    actions: {
        getList ({commit, rootGetters}) {
            return new Promise((resolve, reject) => {
                commit('loadingData', null, {root: true})
                rootGetters.httpInstance.get('/materiel/types').then(resp => {
                    commit('setList', resp.data)
                    resolve(resp.data)
                }).catch(err => {
                    reject(err)
                }).finally(() => {
                    commit('dataLoaded', null, {root: true})
                })
            })
        },
        save ({commit, rootGetters}, params) {
            console.log(params)
            commit('savingData', null, {root: true})
            var postUrl = '/materiel/types'
            if (params.data.id !== '') {
                postUrl += '/' + params.data.id
            }
            rootGetters.httpInstance.post(postUrl, params.data).then(resp => {
                commit('updateListElement', resp.data)
                commit('setFormValue', resp.data)
                params.success(resp.data)
            }).catch(err => {
                params.error(err)
            }).finally(() => {
                commit('dataSaved', null, {root: true})
            })
        }
    }
}
