import firebase from 'firebase'
import { db } from '@/db'

const addItemToArray = (array, newItem) => {
  if(array.indexOf(newItem) === -1) {
    array.push(newItem)
  } 
  return array;
}

export default {
  namespaced: true,

  state: {
    items: {}
  },

  getters: {
    getProjectById: (state) => (id) => {
      console.log(Object.values(state.items))
        return Object.values(state.items).find(todo => todo.id === id)
    },
    projectsWithTodoIds: (state) => (projectIds) => {
      return Object.values(state.items).filter(project => projectIds.includes(project['.key']))
    }
  },

  actions: {
    updateProject ({state, commit, rootState}, {item, itemId}) {
     return new Promise((resolve, reject) => {
       delete item['.key']
       db.collection("projects").doc(itemId).update(item)
       .then(() => {
         commit('setItem', {resource: 'todos', id: itemId, item}, {root: true})
         resolve(item)
       })
       .catch((error) => {
         console.error("🔥 | Error updating document: ", error);
       })
     })
   },
    fetchAllProjects ({state, commit}) {
      console.log('🔥', 'all todos')

      return new Promise((resolve, reject) => {
        db.collection("projects").where("userId", "==", "OwXIWRvPbCaG6fjlSH43svi7EMf2")
          .get()
          .then(function(querySnapshot) {
            commit('setItem', {resource: 'projects', id: false, item: {
              '.key': false,
              noProject: true
            }}, {root: true})
            querySnapshot.forEach(function(doc) {
                  commit('setItem', {resource: 'projects', id: doc.id, item: doc.data()}, {root: true})
              });

              resolve(querySnapshot)
          })
          .catch(function(error) {
              console.error("Error getting documents: ", error);
          });
      })
    },
    addTodoToProject({state, dispatch}, {projectId, todo}) {
      let project = Object.values(state.items).find(item => item.id === projectId)
      project.todos = addItemToArray(project.todos, todo.id)
      
      dispatch('updateProject', {item: project, itemId: project['.key']} )
    },
    fetchCategory: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'categories', id, emoji: '🏷'}, {root: true}),
    fetchCategories: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'categories', ids, emoji: '🏷'}, {root: true})
  }
}
