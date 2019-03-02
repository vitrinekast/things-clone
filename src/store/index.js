import { firebaseMutations, firebaseAction } from 'vuexfire'


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

var testmodule = {
	state: {
		tweets: []
	},
	getters: {
		tweets: state => state.tweets
	},
	actions: {
		setTweetref: firebaseAction(({bindFirebaseRef}, ref) => {
			bindFirebaseRef('tweets', ref)
		})
	}
}

export default new Vuex.Store( {
	plugins: [ vuexPersist.plugin ],
	state: {
		menuOpen: true
	},
	mutations: {
		// your mutations
		...firebaseMutations,
	},
	modules: {
		tags,
		testmodule,
		user,
		project,
		todos,
		general
	}
} );
