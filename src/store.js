import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import moment from "moment";
import router from "./router.js";
import firebase from "firebase";

const vuexPersist = new VuexPersist( {
	key: "my-app",
	storage: localStorage
} );

Vue.use( Vuex );

export default new Vuex.Store( {
	plugins: [ vuexPersist.plugin ],
	state: {
		todos: [],
		activeTodoId: false,
		tags: []
	}
} );
