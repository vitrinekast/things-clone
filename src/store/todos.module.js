	import store from "@/store/index.js";
import { TodoService } from "@/common/todo.service";
const initialState = {
	todos: [],
	selectedTodoId: false,
	filteredTodos: [],
	filters: {
		project: false,
		tag: false
	}
};
export const state = { ...initialState };
export const actions = {
	async getAllTodos( { commit } ) {
		if( !store.state.user.user ) { return false }
		const data = await TodoService.get();
		commit( 'setTodos', data );
		console.log(data)
	},
	async createTodo() {
		if( !store.state.user.user ) { return false }
		await TodoService.create();
		this.dispatch( "getAllTodos" );
	},
	updateAllTodos( { commit }, payload ) {
		commit( 'setTodos', payload.allData );

		TodoService.updateOrder( payload.changes ).then( ( ) => {} )
	},
	updateFilters( { commit, state }, payload ) {
		let filters = state.filters;
		filters.tag = payload.tag !== undefined ? payload.tag : filters.tag;
		filters.project = payload.project !== undefined ? payload.project : filters.project;

		commit( "setFilters", filters );
	},
	updateTodo( context, payload ) {
		console.log(context, payload)
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
	setSelectedTodo( { commit }, payload ) {
		if(this.getters.todo) {
			this.dispatch( "updateTodo", this.getters.todo );
		}
		commit( "setSelectedTodo", payload );
	}
};
export const mutations = {
	setTodos( state, payload ) {
		state.todos = payload;
	},
	setSelectedTodo( state, payload ) {
		state.selectedTodoId = payload;
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
			return todo.id === state.selectedTodoId;
		} );
	},
	filteredTodos(state) {
		console.log(state)
		let array = state.todos;
		if( state.filters.tag ) {
			array = state.todos.filter( todo => todo.tags.includes( state.filters.tag ) );
		}
		if( state.filters.project ) {
			array = state.todos.filter( todo => todo.project === state.filters.project );
		}
		return array
	},
	filters( state ) {

		return state.filters;
	},
	selectedTodoId( state ) {
		return state.selectedTodoId;
	},
};
export default {
	state,
	actions,
	mutations,
	getters
};
