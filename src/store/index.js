import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import tags from "./tags.module";
import user from "./user.module";
import todos from "./todos.module";
import general from "./general.module";
import project from "./project.module";

const vuexPersist = new VuexPersist( {
	key: "my-app",
	storage: localStorage
} );


Vue.use( Vuex );

export default new Vuex.Store( {
	plugins: [ vuexPersist.plugin ],
	modules: {
		tags,
		user,
		project,
		todos,
		general
	},
	mutations: {
		resetState (state) {
		    Object.assign(state, getDefaultState())
		  }
	}
} );
