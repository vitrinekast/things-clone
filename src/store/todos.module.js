import store from "@/store/index.js";
import { TodoService } from "@/common/todo.service";

const initialState = {
	todos: [],
	selectedTodoId: false,
	filteredTodos: [],
	filters: {
		project: undefined,
		tag: undefined,
		date: undefined,
		done: undefined
	}
};

const state = { ...initialState };
const actions = {
	async getAllTodos( { commit } ) {
		if( !store.state.user.user ) { return false }
		const data = await TodoService.get();
		commit( 'setTodos', data );
	},
	async createTodo() {
		if( !store.state.user.user ) { return false }
		await TodoService.create();
		this.dispatch( "getAllTodos" );
	},
	updateAllTodos( { commit }, payload ) {
		commit( 'setTodos', payload.allData );

		TodoService.updateOrder( payload.changes ).then( () => {} )
	},
	updateFilters( { commit, state }, payload ) {
		let filters = Object.assign( state.filters, payload )
		commit( "setFilters", filters );
	},
	updateTodo( context, payload ) {
		TodoService.update( payload ).then( () => {
			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
		} )
	},
	updateTodoWithFilters( context, payload ) {

		payload.todo.planned = TodoService.setDateFromDateType( payload.filters.date )
		this.dispatch( "updateTodo", payload.todo );
	},

	deleteTodo( payload ) {
		TodoService.delete( payload ).then( () => {
			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
		} )
	},
	updateAfteraSorting( { state }, payload ) {
		let array = [];
		payload.forEach( ( val, index ) => {
			val.order = index;
			array.push( {
				order: index,
				id: val.id
			} )
		} )
		this.dispatch( 'updateAllTodos', { changes: array, allData: state.todos } );
	},
	setSelectedTodo( { commit }, payload ) {
		if( this.getters.todo ) {
			this.dispatch( "updateTodo", this.getters.todo );
		}
		commit( "setSelectedTodo", payload );
	}
};
const mutations = {
	setTodos( state, payload ) {
		console.log('setting todos')
		state.todos = payload;
	},
	setSelectedTodo( state, payload ) {
		state.selectedTodoId = payload;
	},
	setFilters( state, payload ) {
		state.filters = payload;
	},
};
const getters = {

	filteredTodos( state ) {
		let array = state.todos;
		return TodoService.filter(state.filters, state.todos);
	},
	filteredTodosByProject( state ) {
		let todos = TodoService.filter(state.filters, state.todos);
		return TodoService.groupByProject(todos);
	},
	filters( state ) {
		return state.filters;
	}
};
export default {
	state,
	actions,
	mutations,
	getters
};
