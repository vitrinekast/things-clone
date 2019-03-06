import store from "@/store/index.js";
import { TagService } from "@/common/tag.service";

const initialState = {
	tags: [],
	tag: {}
};

const state = { ...initialState };

const actions = {
	async getAllTags( { commit } ) {

		if( !store.state.user.user ) { return false }
		const data = await TagService.get();

		commit( 'setTags', data );
	},
	addNewTagToTodo( context, payload ) {
		payload.todo.tags.push( payload.text );
		this.dispatch( "updateTodo", payload.todo );
	},
	removeTagFromTodo( context, payload ) {

		payload.todo.tags = payload.todo.tags.filter( function ( value ) {
			return value.text === payload.text
		} );
		this.dispatch( "updateTodo", payload.todo );
	},
	deleteAllTags( { state } ) {
		state.tags.forEach( ( tag ) => {
			return TagService.delete( tag );
		} )

		this.dispatch( "getAllTags" );
	}
};
const mutations = {
	setTags( state, tags ) {
		state.tags = tags;
	}
};
const getters = {
	tags( state ) {
		return state.tags;
	},
	FilteredTags(state) {
		let todos = store.getters.filteredTodos;

		return state.tags.filter((item ) => {
			return todos.find(todo => todo.tags.includes(item.text))
		})
	}
};
export default {
	state,
	actions,
	mutations,
	getters
};
