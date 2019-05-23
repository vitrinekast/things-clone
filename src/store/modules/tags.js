import { db } from '@/db'
import { addItemToArray, baseTag, emptyProject } from '@/helpers'
import { DBService } from '@/service/db'

const resource = 'tags'

export default {
    namespaced: true,

    state: {
        items: {}
    },

    getters: {
        getTagById: (state) => (id) => {
            return Object.values(state.items).find(todo => todo.id === id)
        },
        tags: (state) => {
            return Object.values(state.items)
        },
        filteredTags: (state) => (filters) => {
            return Object.values(state.items).filter(item => {
                const found = item.todos.some(r => filters.todos.includes(r))
                return found
            })
        }
    },

    actions: {
        updateTag({ commit }, { item, itemId }) {
            return DBService.UPDATE({ commit, resource, item })
        },
        getOrCreateTag({ dispatch, commit }, { text, todoId }) {
            db.collection("tags").where("text", "==", text).limit(1).get().then((querySnapshot) => {
                if(querySnapshot.docs.length > 0) {
                    let tag = querySnapshot.docs[0].data()
                    tag.todos = addItemToArray(tag.todos, todoId)
                    dispatch('updateTag', { item: tag, itemId: tag.id })

                } else {
                    let tag = baseTag(text, todoId)
                    DBService.POST({ commit, resource, item: tag })
                }
            })
        },

        removeTag({ commit }, { item, itemId }) {
            return DBService.DELETE({ commit, resource, item })
        },
        createTag({ state, commit }, { item }) {
            item = baseTag(state, item);
            return DBService.POST({ commit, resource, item })
        },
        fetchAllTags({ commit }) {
            return DBService.GETALL({ commit, resource }).then(() => {
                commit('setItem', emptyProject, { root: true })
            })
        },
        fetchTags({ commit }, todoIds) {
            console.log(todoIds)
            if(todoIds.length === 0) {
                return false
            }

            return new Promise((resolve) => {
                var todoRef = db.collection("tags")
                    .get()
                    .then(function (querySnapshot) {

                        querySnapshot.forEach(function (doc) {
                            let item = doc.data()
                            if(item.todos.some(r => todoIds.includes(r))) {
                                commit('setItem', { resource: resource, id: doc.id, item }, { root: true })
                            }

                        });
                        resolve(querySnapshot)
                    })
                    .catch(function (error) {
                        console.error("🔥 | Error getting document: ", error);
                    });
            })
        }
    }
}
