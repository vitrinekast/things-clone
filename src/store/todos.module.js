import store from "./index.js";
import { db } from '../main'
import { ApiService } from "@/common/api.service";
import { TodoService } from "@/common/todo.service";


const initialState = {
	todos: [],
	activeTodoId: false,
	filteredTodos: [],
	filters: []
};

const ID = () => {
	return '_' + Math.random().toString( 36 ).substr( 2, 9 );
};

export const state = { ...initialState };

export const actions = {
	async getAllTodos( { state, commit } ) {
		if( !store.state.user.user ) { return false }
		const data = await TodoService.get();
		commit( 'setTodos', data );
	},
	async createTodo( { state, commit } ) {
		if( !store.state.user.user ) { return false }
		await TodoService.create();
		this.dispatch( "getAllTodos" );
	},

	updateFilters( { state, commit }, payload ) {
		commit( "setFilters", payload );
	},
	updateTodo( { state, commit }, payload ) {
		TodoService.update( payload ).then( (todo ) => {
			console.log('got updated', todo)
			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
		} )

	},
	deleteTodo( { state, commit }, payload ) {
		TodoService.delete( payload ).then( ( ) => {
			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
		} )
	},
	deleteAllTodos( { state, commit } ) {
		state.todos.forEach((todo) => {
			return TodoService.delete( todo );
		})

		this.dispatch( "getAllTodos" );
	},
	setActiveTodo( { state, commit }, payload ) {
		commit( "setActiveTodo", payload.id );
	}

};
export const mutations = {
	setTodos( state, payload ) {
		state.todos = payload;
	},
	createTodo( state, payload ) {
		state.todos.push( payload );
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
