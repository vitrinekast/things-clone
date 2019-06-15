import { baseTag } from '@/helpers'
import { DBService } from '@/service/db'

const resource = 'tags'

export default {
    namespaced: true,

    state: {
        items: {}
    },

    getters: {
        tagsByIds: (state) => (ids) => {
            return Object.values(state.items).filter(todo => ids.indexOf(todo.id) !== -1)
        },
        tags: (state) => {
            return Object.values(state.items)
        }
    },

    actions: {
      fetchAllTags({ commit }) {
        return DBService.FETCHALL({commit, resource})
      },
      create({commit, dispatch}, {item}) {
        item = baseTag(item);
        
        return DBService.CREATE({commit, resource, item}).then(() => {
          dispatch('fetchAllTags')
        })
      },
      update({commit, dispatch}, {item}) {
        return DBService.UPDATE({commit, resource, item}).then(() => {
          dispatch('fetchAllTags')
        })
      }
    }
}
