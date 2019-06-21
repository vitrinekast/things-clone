import mockData from '@/mockData'
import { generateID } from '@/helpers'
import Vue from 'vue'
import firebase from 'firebase/app'

export const DBService = {
  getKey: (resource) => {
    return firebase.database().ref(resource).push().key
  },
    FETCHALL: ({ commit, resource }) => {
        return new Promise((resolve) => {
          firebase.database().ref(resource).once('value', snapshot => {
            commit('setItems', { resource, items: snapshot.val() }, { root: true })
            resolve(snapshot.val())
          })
        })
    },

    UPDATE: ({ commit, resource, item }) => {
       
      mockData[resource][item.id] = item;
      
      return new Promise((resolve) => {
        const updates = {}
        updates[`/${resource}/${item.id}`] = item
        console.info('updating', updates)
        firebase.database().ref().update(updates).then(() => {
          commit('setItem', { resource, item, id: item.id }, { root: true })
          resolve(item)
        })
      })
    },

    UPDATEBATCH: ({ commit, updates }) => {
             
      return new Promise((resolve) => {
        firebase.database().ref().update(updates).then((item) => {
          // commit('setItem', { resource, item, id: item.id }, { root: true })
          resolve(item)
        })
      })
    },

    REMOVE: ({ commit, resource, item }) => {
        mockData[resource] = mockData[resource].filter(function (obj) {
            return obj.id !== item.id;
        });

        return new Promise((resolve) => {
            commit('deleteItem', { resource, item, id: item.id }, { root: true })
            resolve(item)
        })
    },
    CREATE: ({ commit, resource, item }) => {
        item.id = item.id ? item.id : generateID();
        
        Vue.set(mockData[resource], item.id, item)
        
        return new Promise((resolve) => {
            commit('setItem', { resource, item, id: item.id }, { root: true })
            resolve(item)
            
        })
    }

}
