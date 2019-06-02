import { db } from '@/db'

export const DBService = {
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
        return new Promise((resolve) => {
            if(item['.key']) {
                delete item['.key']
            }
            
            db.collection(resource).doc(item.id).update(item)
                .then(() => {
                    commit('setItem', { resource: resource, id: item.id, item }, { root: true })
                    resolve(item)
                })
                .catch((error) => {
                    console.error("🔥 | Error updating document: ", error);
                })
        })
    },

    DELETE: ({ commit, resource, item }) => {
        return new Promise((resolve) => {
            db.collection(resource).doc(item.id).delete()
                .then((data) => {
                    commit('deleteItem', { resource: resource, id: item.id, item }, { root: true })
                    resolve(data)
                })
                .catch((error) => {
                    console.error("🔥 | Error posting document: ", error);
                })
        })
    }

}
