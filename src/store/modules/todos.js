import { filterTodo, parseTodo, generateID } from '@/helpers'
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
            return filterTodo(Object.values(state.items), filters)
        }
    },

    actions: {
      fetchAllTodos({ commit }) {
        return DBService.FETCHALL({commit, resource})
      },
      removeTodo({commit, dispatch}, {item} ) {
        return DBService.REMOVE({commit, resource, item}).then(() => {
          dispatch('fetchAllTodos')
        })
      },
      updateTodo({commit, dispatch}, {item}) {
         
        return DBService.UPDATE({commit, resource, item}).then(() => {
          dispatch('fetchAllTodos')
        })
      },
      createTodo({commit, dispatch, rootState}, {item}) {
        const updates = {}
        
        let todo = parseTodo(item)
        todo.id = DBService.getKey(resource)
        console.log(todo)
        debugger
        item.tags.filter(tag => tag.indexOf('#') === 0).forEach((text, index) => {
          text = text.replace('#', '');
          let tag = Object.values(rootState.tags.items).find(item => item.text === text)
          todo.tags[index] = tag ? tag.id  : DBService.getKey('tags');
          
          if(tag) {
            updates[`tags/${tag.id}/todos/${todo.id}`] = todo.id;
          } else {
            updates[`tags/${todo.tags[index]}`] = { id: todo.tags[index], text, todos: [todo.id]  }
          }
        })
        
        updates[`todos/${todo.id}`] = todo;
        
        return DBService.UPDATEBATCH({commit, updates }).then((data) => {
          commit('setItem', { resource, item: todo, id: todo.id }, { root: true })
          dispatch('tags/fetchAllTags', null, {root: true})
          dispatch('projects/fetchAllProjects', null, {root: true})
          
        })
      }
    }
}
