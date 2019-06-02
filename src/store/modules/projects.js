import { addItemToArray, baseProject, emptyProject } from '@/helpers'
import { DBService } from '@/service/db'
import {db
} from '@/db'
const resource = 'projects'

export default {
    namespaced: true,

    state: {
        items: {}
    },

    getters: {
        getProjectById: (state) => (id) => {
            return Object.values(state.items).find(todo => todo.id === id)
        },
        projectsWithTodoIds: (state) => (projectIds) => {
            return Object.values(state.items).filter(project => projectIds.includes(project['.key']))
        }
    },

    actions: {
        updateProject({ commit }, { item }) {
            return DBService.UPDATE({ commit, resource, item })
        },
        removeProject({ commit }, { item }) {
            return DBService.DELETE({commit, resource, item})
        },
        createTodo({ state, commit }, { item }) {
            item = baseProject(state, item);
            return DBService.POST({ commit, resource, item })
        },
        fetchAllProjects({ commit }) {
          console.log('oi')
            return DBService.GETALL({ commit, resource }).then(() => {
                commit('setItem', emptyProject, { root: true })
            })
        },
        fetchProjects({ commit, rootState }) {
          const userId = rootState.users.user.uid

            return new Promise((resolve) => {
                db.collection(resource)
                .where("userId", "==", userId)
                .get()
                    .then(function (querySnapshot) {
                        console.log('TODO: implement setItems instead of steadItem', querySnapshot, userId)
                        querySnapshot.forEach(function (doc) {
                            commit('setItem', { resource: resource, id: doc.id, item: doc.data() }, { root: true })
                        });
                        commit('setItem', emptyProject, { root: true })
                        resolve(querySnapshot)
                    })
                    .catch(function (error) {
                        console.error("🔥 | Error getting document: ", error);
                    });
                });
        },
        addTodoToProject({ state, dispatch }, { projectId, todo }) {
            let project = Object.values(state.items).find(item => item.id === projectId)
            project.todos = addItemToArray(project.todos, todo.id)

            dispatch('updateProject', { item: project, itemId: project['.key'] })
        }
    }
}
