const initialState = {
	menuOpen: false,
	count: 0
};
const state = { ...initialState };
const actions = {
	updateMenuOpen( { commit }, payload ) {
		commit( 'setMenuOpen', payload );
	}
};
const mutations = {
	setMenuOpen( state, payload ) {

		state.menuOpen = payload;
	}
};
const getters = {
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
