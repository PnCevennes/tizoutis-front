export default {
    namespaced: true,
    state: {
        cache: []
    },
    getters: {
        getByRef: (state) => (ref) => {
            return state.cache.filter(x => x.id_ref === ref)
        },
        getById: (state) => (id) => {
            return state.cache.find(x => x.id === id)
        },
        asTree (state) {
            var tree = {'0': {children: []}}
            state.cache.map(x => {
                console.log(x)
                if (!tree['' + x.id_ref].children) {
                    tree['' + x.id_ref].children = []
                }
                tree['' + x.id_ref].children.push(x)
                tree['' + x.id] = x
            })
            return tree['0'].children
        }
    },
    mutations: {
        setData (state, data) {
            state.cache = data
        },
        updateData (state, data) {
        }
    },
    actions: {
        load ({commit, state, rootGetters}) {
            return new Promise((resolve, reject) => {
                commit('loadingData', null, {root: true})
                rootGetters.httpInstance.get('/thesaurus/').then(resp => {
                    commit('setData', resp.data)
                    resolve(state.cache)
                }).catch(err => {
                    reject(err)
                }).finally(() => {
                    commit('dataLoaded', null, {root: true})
                })
            })
        },
        save ({commit, state, rootGetters}, data) {
            var DestUrl = '/thesaurus/'
            if (data.id) {
                DestUrl += data.id
            }
            commit('savingData', null, {root: true})
            return new Promise((resolve, reject) => {
                rootGetters.httpInstance.post(DestUrl, data).then(resp => {
                    commit('updateData', resp.data)
                }).catch(err => {
                    reject(err)
                }).finally(() => {
                    commit('dataSaved', null, {root: true})
                })
            })
        }
    }
}
