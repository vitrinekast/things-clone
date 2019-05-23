import { db } from '@/db'
import { addItemToArray, baseProject, emptyProject } from '@/helpers'
import { DBService } from '@/service/db'

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
        updateProject({ commit }, { item, itemId }) {
            return DBService.UPDATE({ commit, resource, item })
        },
        removeProject({ commit }, { item, itemId }) {
            return DBService.DELETE({commit, resource, item})
        },
        createTodo({ state, commit }, { item }) {
            item = baseProject(state, item);
            return DBService.POST({ commit, resource, item })
        },
        fetchAllProjects({ commit }) {
            return DBService.GETALL({ commit, resource }).then(() => {
                commit('setItem', emptyProject, { root: true })
            })
        },
        addTodoToProject({ state, dispatch }, { projectId, todo }) {
            let project = Object.values(state.items).find(item => item.id === projectId)
            project.todos = addItemToArray(project.todos, todo.id)

            dispatch('updateProject', { item: project, itemId: project['.key'] })
        }
    }
}
