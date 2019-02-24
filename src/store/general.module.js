const initialState = {
	menuOpen: false
};
export const state = { ...initialState };
export const actions = {
	updateMenuOpen( { commit }, payload ) {
		console.log( 'updating', payload )
		commit( 'setMenuOpen', payload );
	}
};
export const mutations = {
	setMenuOpen( state, payload ) {
		console.log( 'setting a state', payload )
		state.menuOpen = payload;
	}
};
export const getters = {
	menuOpen( state ) {
		console.log( 'getting menu open', state )
		return state.menuOpen;
	}
};
export default {
	state,
	actions,
	mutations,
	getters
};
