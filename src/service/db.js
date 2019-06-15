import { db } from '@/db'
import mockData from '@/mockData'
import { generateID } from '@/helpers'
import Vue from 'vue'

export const DBService = {
    FETCHALL: ({ commit, resource }) => {
        const items = mockData[resource];

        return new Promise((resolve) => {
            commit('setItems', { resource, items }, { root: true })
            resolve(items)
        })
    },
    POST: ({ commit, resource, item }) => {
        return new Promise((resolve) => {

            db.collection(resource).doc(item.id).set(item)
                .then((data) => {
                    commit('setItem', { resource, id: item.id, item }, { root: true })
                    resolve(data)
                })
                .catch((error) => {
                    console.error("🔥 | Error posting document: ", error);
                })
        })
    },

    GETALL: ({ commit, resource }) => {
        return new Promise((resolve) => {
            db.collection(resource)
                // .where("userId", "==", "OwXIWRvPbCaG6fjlSH43svi7EMf2")
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        commit('setItem', { resource: resource, id: doc.id, item: doc.data() }, { root: true })
                    });
                    resolve(querySnapshot)
                })
                .catch(function (error) {
                    console.error("🔥 | Error getting document: ", error);
                });
        })
    },

    UPDATE: ({ commit, resource, item }) => {
      mockData[resource][item.id] = item;
      
      return new Promise((resolve) => {
          commit('setItem', { resource, item, id: item.id }, { root: true })
          resolve(item)
          
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
