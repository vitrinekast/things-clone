import Vue from 'vue'

export default {
  setItem (state, {item, id, resource}) {
    item['.key'] = id
    
    Vue.set(state[resource].items, id, item)
  },
  setItems (state, {items, resource}) {
    state[resource].items = items;
  },
  deleteItem (state, {item, id, resource}) {
    item['.key'] = id
    Vue.delete(state[resource].items, id, item)
  }
}
