import { db } from '@/db'
import { filterTodo, parseTodo, baseTodo, filterQuery, getTagsFromString } from '@/helpers'
import { DBService } from '@/service/db'

const resource = "todos"
const getDefaultState = () => {
  return {
    items: []
  }
}
export default {
    namespaced: true,

    state: getDefaultState(),
    
    mutations: {
      resetState: (state) => {
        Object.assign(state, getDefaultState())
      }
    },
    
    getters: {
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id)
        },
        todos: (state) => {
            return Object.values(state.items)
        },
        filteredTodos: (state) => (filters) => {
            return filterTodo({ filters, items: Object.values(state.items) });
        },
    },

    actions: {
        createTodo({ dispatch, state, commit }, { item }) {
            item = baseTodo(state, item);
            item = parseTodo(item);
            item.tags.forEach((tag) => {
                dispatch('tags/getOrCreateTag', { text: tag, todoId: item.id }, { root: true })
            })
            return DBService.POST({ commit, resource: "todos", item })
        },
        removeTodo({ commit }, { item }) {
            return DBService.DELETE({ commit, resource: "todos", item })
        },
        updateTodo({ commit }, { item, itemId }) {
            item = parseTodo(item);
            debugger
            return DBService.UPDATE({ commit, resource: "todos", item })
        },
        fetchAllTodos({ commit }) {
            return DBService.GETALL({ commit, resource: "todos" })
        },
        fetchTodos({ commit }, filters) {
          console.log('fetching todos with', filters)
          commit('resetState')
            return new Promise((resolve) => {
                var todoRef = db.collection("todos")
                var query = filterQuery(todoRef, filters)
                query.get()
                    .then(function (querySnapshot) {
                        console.log('TODO: implement setItems instead of steadItem', querySnapshot.docs)
                        querySnapshot.forEach(function (doc) {
                            commit('setItem', { resource: resource, id: doc.id, item: doc.data() }, { root: true })
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
