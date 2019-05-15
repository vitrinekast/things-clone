import firebase from 'firebase'
import { db } from '@/db'
import { filterByDate, generateID, parseTodo, baseTodo } from '@/helpers/utils'


export default {
    namespaced: true,

    state: {
        items: {}
    },

    getters: {
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id)
        },
        todos: (state) => {
            return Object.values(state.items)
        },
        filteredTodos: (state) => (filters) => {
            console.log('filtering on', filters)
            return filterByDate({ filters, items: Object.values(state.items) });
        },
    },

    actions: {
        createTodo({ state, commit }, { item }) {
            item = baseTodo(state, item);

            return new Promise((resolve, reject) => {
                db.collection("todos").doc(item.id).set(item)
                    .then((data) => {
                        commit('setItem', { resource: 'todos', id: item.id, item }, { root: true })
                        resolve(data)
                    })
                    .catch((error) => {
                        console.error("🔥 | Error posting document: ", error);
                    })
            })
        },
        removeTodo({ state, commit }, { item }) {
            return new Promise((resolve, reject) => {
                db.collection("todos").doc(item.id).delete()
                    .then((data) => {
                        commit('deleteItem', { resource: 'todos', id: item.id, item }, { root: true })
                        resolve(data)
                    })
                    .catch((error) => {
                        console.error("🔥 | Error posting document: ", error);
                    })
            })
        },
        updateTodo({ state, commit, rootState }, { item, itemId }) {
          item = parseTodo(item);
          
            return new Promise((resolve, reject) => {
                delete item['.key']
                db.collection("todos").doc(itemId).update(item)
                    .then(() => {
                        commit('setItem', { resource: 'todos', id: itemId, item }, { root: true })
                        resolve(item)
                    })
                    .catch((error) => {
                        console.error("🔥 | Error updating document: ", error);
                    })
            })
        },
        fetchAllTodos({ state, commit }) {
            return new Promise((resolve, reject) => {
                db.collection("todos")
                    // .where("userId", "==", "OwXIWRvPbCaG6fjlSH43svi7EMf2")
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            commit('setItem', { resource: 'todos', id: doc.id, item: doc.data() }, { root: true })
                        });
                    })
                    .catch(function (error) {
                        console.error("Error getting documents: ", error);
                    });
            })
        }
    }
}
