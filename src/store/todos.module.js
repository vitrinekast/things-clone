import store from "@/store/index.js";
import { TodoService } from "@/common/todo.service";
const initialState = {
	todos: [],
	activeTodoId: false,
	filteredTodos: [],
	filters: {
		project: 'false',
		tag: 'false'
	}
};
export const state = { ...initialState };
export const actions = {
	async getAllTodos( { commit } ) {
		if( !store.state.user.user ) { return false }
		const data = await TodoService.get();
		console.log('commit', commit)
		commit( 'setTodos', data );
	},
	async createTodo() {
		if( !store.state.user.user ) { return false }
		await TodoService.create();
		this.dispatch( "getAllTodos" );
	},
	updateAllTodos( { commit }, payload, allTodos ) {
		commit( 'setTodos', payload.allData );

		TodoService.updateOrder( payload.changes ).then( (data) => {
		} )
	},
	updateFilters( { commit, state }, payload ) {
		console.log('updateFilters')
		let filters = state.filters;
		filters.tag  = payload.tag !== undefined ? payload.tag : filters.tag;
		filters.project  = payload.project !== undefined ? payload.project : filters.project;

		commit( "setFilters", filters );
	},
	updateTodo( { state }, payload ) {
		TodoService.update( payload ).then( () => {
			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
		} )
	},
	deleteTodo( payload ) {
		TodoService.delete( payload ).then( () => {
			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
		} )
	},
	deleteAllTodos( { state } ) {
		state.todos.forEach( ( todo ) => {
			return TodoService.delete( todo );
		} )
		this.dispatch( "getAllTodos" );
	},
	setActiveTodo( { commit }, payload ) {
		commit( "setActiveTodo", payload );
	}
};
export const mutations = {
	setTodos( state, payload ) {
		state.todos = payload;
	},
	setActiveTodo( state, payload ) {
		state.activeTodoId = payload;
	},
	setFilters( state, payload ) {
		state.filters = payload;
	},
};
export const getters = {
	todos( state ) {
		return state.todos;
	},
	todo( state ) {
		return state.todos.find( function ( todo ) {
			return todo.id === state.activeTodoId;
		} );
	},
	filters( state ) {

		return state.filters;
	},
	activeTodoId( state ) {
		return state.activeTodoId;
	},
};
export default {
	state,
	actions,
	mutations,
	getters
};
