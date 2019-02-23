import router from "../router.js";
import firebase from 'firebase';

const initialState = {
	user: null
};

export const state = { ...initialState };

export const actions = {
	signUp( { commit }, { email, password } ) {
		firebase
			.auth()
			.createUserWithEmailAndPassword( email, password )
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
	login( { commit }, { email, password } ) {
		firebase
			.auth()
			.signInWithEmailAndPassword( email, password )
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
