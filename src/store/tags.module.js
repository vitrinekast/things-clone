import store from "@/store/index.js";
import { TagService } from "@/common/tag.service";

const initialState = {
	tags: [],
	tag: {}
};

export const state = { ...initialState };

export const actions = {
	async getAllTags( { commit } ) {

		if( !store.state.user.user ) { return false }
		const data = await TagService.get();

		commit( 'setTags', data );
	},
	deleteAllTags( { state } ) {
		state.tags.forEach( ( tag ) => {
			return TagService.delete( tag );
		} )

		this.dispatch( "getAllTags" );
	}
};
export const mutations = {
	setTags( state, tags ) {

		state.tags = tags;
	}
};
export const getters = {
	tags( state ) {

		return state.tags;
	}
};
export default {
	state,
	actions,
	mutations,
	getters
};
