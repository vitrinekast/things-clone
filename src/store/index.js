import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import moment from "moment";
import router from "../router.js";
import firebase from "firebase";

import tags from "./tags.module";
import user from "./user.module";
import todos from "./todos.module";

const vuexPersist = new VuexPersist( {
	key: "my-app",
	storage: localStorage
} );

Vue.use( Vuex );

export default new Vuex.Store({
    plugins: [ vuexPersist.plugin ],
  modules: {
    tags,
    user,
    todos
  }
});
