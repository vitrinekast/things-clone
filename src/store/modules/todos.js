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
        item = parseTodo(item)
        const todoId = generateID();
        
        item.tags.forEach((tagString, index) => {
          if(tagString.indexOf('#') === 0) {
            let tag = Object.values(rootState.tags.items).find(item => item.text === tagString.replace('#', ''))
            
            if(tag) {
              tag.todos.push(todoId);
              item.tags[index] = tag.id
              dispatch('tags/update', {item: tag}, {root: true})
            } else {
              let newTag = {
                id: generateID(),
                text: tagString.replace('#', ''),
                todos: [todoId]
              }
              dispatch('tags/create', {item: newTag}, {root: true})
              item.tags[index] = newTag.id
            }
          }
        })
        console.log('creating this todo', item)
        return DBService.CREATE({commit, resource, item}).then(() => {
          dispatch('fetchAllTodos')
        })
      }
    }
}
