import { db } from '@/db'
import firebase from 'firebase'

export default {
  fetchItem ({state, commit}, {id, resource}) {
    return new Promise((resolve, reject) => {
      db.collection(resource).doc(id).get().then((doc) => {
        commit('setItem', {resource, id: doc.id, item: doc.data()})
        resolve(state[resource].items[id])
      })
    })
  },

  fetchItems ({dispatch}, {ids, resource, emoji}) {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)
    return Promise.all(ids.map(id => dispatch('fetchItem', {id, resource, emoji})))
  }
}
