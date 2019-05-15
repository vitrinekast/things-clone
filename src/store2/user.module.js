import router from "@/router.js";
import firebase from 'firebase';

const initialState = {
	user: null
};

const state = { ...initialState };

const actions = {
	signUp( { commit }, payload ) {
		firebase
			.auth()
			.createUserWithEmailAndPassword( payload.email, payload.password )
			.then( user => {
				commit( "setUser", user )
				router.push( "/" )
			} )
			.catch( error => {
				console.error( error );
				commit( "setUser", null );
				router.push( "/" );
			} );
	},
	login( { commit }, payload ) {
		firebase
			.auth()
			.signInWithEmailAndPassword( payload.email, payload.password )
			.then( user => {
				commit( "setUser", user );
				router.push( "/" );
			} )
			.catch( error => {
				console.error( error );
				commit( "setUser", null );
				router.push( "/" );
			} );
	}
};
const mutations = {
	setUser( state, payload ) {
		state.user = payload.user
	}
};
const getters = {
	user( state ) {
		return state.user;
	},
};

export default {
	state,
	actions,
	mutations,
	getters
};
