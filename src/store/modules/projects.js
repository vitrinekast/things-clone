import { DBService } from '@/service/db'
import {baseProject} from '@/helpers'

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
        projects: (state) => {
            return Object.values(state.items)
        },
    },

    actions: {
        fetchAllProjects({ commit }) {
          return DBService.FETCHALL({commit, resource})
        },
        createProject({ commit, dispatch }) {
          return new Promise((resolve) => {
            DBService.CREATE({commit, resource, item: baseProject()}).then((item) => {
              dispatch('fetchAllProjects')
              console.log('resolving', item)
              resolve(item)
            })
          })
        },
        updateProject({ dispatch, commit }, {item}) {
          
          return new Promise((resolve) => {
            DBService.UPDATE({commit, resource, item}).then((item) => {
              dispatch('fetchAllProjects')
              console.log('resolving', item)
              resolve(item)
            })
          })
        },
    }
}
