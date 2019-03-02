import router from "@/router.js";
import firebase from 'firebase';

const initialState = {
	user: null
};

export const state = { ...initialState };

export const actions = {
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
export const mutations = {
	setUser( state, payload ) {
		state.user = payload.user
	}
};
export const getters = {
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
