const initialState = {
	menuOpen: false,
	count: 0
};
export const state = { ...initialState };
export const actions = {
	updateMenuOpen( { commit }, payload ) {
		commit( 'setMenuOpen', payload );
	}
};
export const mutations = {
	setMenuOpen( state, payload ) {

		state.menuOpen = payload;
	}
};
export const getters = {
	menuOpen( state ) {
		return state.menuOpen;
	}
};
export default {
	state,
	actions,
	mutations,
	getters
};
