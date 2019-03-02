import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import tags from "./tags.module";
import user from "./user.module";
import todos from "./todos.module";
import general from "./general.module";
import project from "./project.module";
import createLogger from 'vuex/dist/logger'

const vuexPersist = new VuexPersist( {
	key: "my-app",
	storage: localStorage
} );

Vue.use( Vuex );

export default new Vuex.Store( {
	plugins: [ vuexPersist.plugin, createLogger() ],
	modules: {
		tags,
		user,
		project,
		todos,
		general
	}
} );
