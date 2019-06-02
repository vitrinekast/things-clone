import { db } from '@/db'
import { filterTodo, parseTodo, baseTodo, filterQuery } from '@/helpers'
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
        createTodo({ dispatch, state, commit, rootState }, { item }) {
            item.userId = rootState.users.user.uid;
            item = baseTodo(state, item);
            item = parseTodo(item);
            
            item.tags.forEach((tag) => {
                dispatch('tags/getOrCreateTag', { text: tag, todoId: item.id }, { root: true })
            })
            
            dispatch('tags/updateRemovedTags', { tags: item.tags, todoId: item.id }, { root: true })
            return DBService.POST({ commit, resource: "todos", item })
        },
        removeTodo({ commit }, { item }) {
            return DBService.DELETE({ commit, resource: "todos", item })
        },
        updateTodo({ commit,dispatch }, { item }) {
            item = parseTodo(item);
            
            item.tags.forEach((tag) => {
                dispatch('tags/getOrCreateTag', { text: tag, todoId: item.id }, { root: true })
            })
            dispatch('tags/updateRemovedTags', { tags: item.tags, todoId: item.id }, { root: true })
            return DBService.UPDATE({ commit, resource: "todos", item })
        },
        fetchAllTodos({ commit }) {
            return DBService.GETALL({ commit, resource: "todos" })
        },
        fetchTodos({ commit, rootState }, filters) {
          const userId = rootState.users.user.uid
          console.log('fetching todos with', filters)
          
            return new Promise((resolve) => {
                var todoRef = db.collection("todos")
                var query = filterQuery(todoRef, filters)
                query = query.where("userId", "==", userId)
                query.get()
                    .then(function (querySnapshot) {
                        console.log('TODO: implement setItems instead of todo', querySnapshot)
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
