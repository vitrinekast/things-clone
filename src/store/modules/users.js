import firebase from 'firebase/app';

const resource = "users"

const getDefaultState = () => {
    return {
        items: [],
        user: {}
    }
}
export default {
    namespaced: true,
    state: getDefaultState(),

    mutations: {
        resetState: (state) => {
            Object.assign(state, getDefaultState())
        },
        setUser(state, user) {
            state.user = user
        },
        setAuthId(state, id) {
            state.authId = id
        }
    },

    getters: {
        user(state) {
            return state.user;
        },
        authUser(state) {
            return state.user;
        },
    },

    actions: {

        initAuth({ commit }) {
            return new Promise((resolve) => {
                // unsubscribe observer if already listening

                firebase.auth().onAuthStateChanged(user => {
                    console.info('👣 the user has changed', user)
                    if(user) {
                        commit('setUser', user)
                        resolve(user)
                    } else {
                        resolve(null)
                    }
                })
            })
        },

        signUp({ commit }, { email, password }) {
            return new Promise((resolve, reject) => {
                firebase.auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((resp) => {
                        resolve(resp)
                        commit("setItem", { item: resp.user, id: resp.user.uid, resource }, { root: true })
                    })
                    .catch((error) => {
                        reject(error)
                        console.error('error', error)
                        commit("setItem", { item: false, id: false, resource }, { root: true })
                    })
            })
        },
        login({ commit }, { email, password }) {
            return new Promise((resolve, reject) => {
                firebase.auth()
                    .signInWithEmailAndPassword(email, password)
                    .then((resp) => {
                        resolve(resp)
                        commit("setItem", { item: resp.user, id: resp.user.uid, resource }, { root: true })
                    })
                    .catch((error) => {
                        reject(error)
                        commit("setItem", { item: false, id: false, resource }, { root: true })
                    })

            })
        }
    }
}
