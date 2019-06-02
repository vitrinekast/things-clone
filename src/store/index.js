import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import todos from './modules/todos'
import projects from './modules/projects'
import tags from './modules/tags'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters,
  actions,
  mutations,
  modules: {
    todos,
    projects,
    tags,
    users
  }
})
