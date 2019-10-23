export default {
    namespaced: true,
    state: {
        affectationsList: [],
        currentAffectation: {},
        defaultAffectation: {
            id: null,
            id_materiel: null,
            type_affectation: null,
            utilisateur: null,
            date_affectation: null,
            date_retour: null,
            observations: null
        }
    },
    getters: {
        getCurrentAffectation (state) {
            if (state.currentAffectation.id) {
                return state.currentAffectation
            }
            var current = state.affectationsList.find(x => x.date_retour === null)
            if (current) {
                return current
            } else {
                return state.defaultAffectation
            }
        }
    },
    mutations: {
        setAffectationsList (state, data) {
            state.affectationsList = data
            state.currentAffectation = {...state.defaultAffectation}
        },
        setCurrent (state, data) {
            state.currentAffectation = data
        },
        setIdMateriel (state, data) {
            state.defaultAffectation.id_materiel = data
        },
        addAffListElement (state, data) {
            state.affectationsList.push(data)
        },
        updateAffListElement (state, data) {
            var lst = [...state.affectationsList]
            var idx = lst.findIndex(x => x.id === data.id)
            lst[idx] = data
            state.affectationsList = lst
        },
        removeListElement (state, data) {
            var idx = state.affectationsList.findIndex(x => x.id === data.id)
            state.affectationsList.splice(idx, 1)
        },
        resetForm (state) {
            state.currentAffectation = {...state.defaultAffectation}
        }
    },
    actions: {
        getList ({commit, rootGetters}, idMat) {
            commit('setIdMateriel', idMat)
            return new Promise((resolve, reject) => {
                commit('loadingData', null, {root: true})
                rootGetters.httpInstance.get('/materiel/affectations/' + idMat).then(resp => {
                    commit('setAffectationsList', resp.data)
                    resolve(resp.data)
                }).catch(err => {
                    reject(err)
                }).finally(() => {
                    commit('dataLoaded', null, {root: true})
                })
            })
        },
        save ({commit, dispatch, rootGetters}, data) {
            commit('savingData', null, {root: true})
            return new Promise((resolve, reject) => {
                var postURL = '/materiel/affectation'
                if (data.id) {
                    postURL += '/' + data.id
                }
                rootGetters.httpInstance.post(postURL, data).then(resp => {
                    if (data.id) {
                        commit('updateAffListElement', resp.data)
                    } else {
                        commit('addAffListElement', resp.data)
                    }
                    dispatch('materiel/updateDispo', {
                        id_materiel: data.id_materiel,
                        disponible: data.date_retour !== null,
                        utilisateur_actuel: data.date_retour === null ? data.utilisateur : ''
                    }, {root: true})
                    resolve(resp.data)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                }).finally(() => {
                    commit('dataSaved', null, {root: true})
                })
            })
        },
        remove ({commit, rootGetters}, data) {
            commit('savingData', null, {root: true})
            return new Promise((resolve, reject) => {
                rootGetters.httpInstance.delete('/materiel/affectation/' + data.id).then(resp => {
                    commit('removeListElement', data)
                    resolve(resp.data)
                }).catch(err => {
                    reject(err)
                }).finally(() => {
                    commit('dataSaved', null, {root: true})
                })
            })
        }
    }
}
