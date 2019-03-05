import store from "@/store/index.js";
import { TodoService } from "@/common/todo.service";
import moment from 'moment';

const initialState = {
	todos: [],
	selectedTodoId: false,
	filteredTodos: [],
	filters: {
		project: false,
		tag: false,
		noProject: false,
		date: false,
		noDate: false
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

		TodoService.updateOrder( payload.changes ).then( ( ) => {} )
	},
	updateFilters( { commit, state }, payload ) {
		let filters = state.filters;
		filters.tag = payload.tag !== undefined ? payload.tag : filters.tag;
		filters.project = payload.project !== undefined ? payload.project : filters.project;
		filters.noProject = payload.noProject !== undefined ? payload.noProject : filters.noProject;
		filters.noDate = payload.noDate !== undefined ? payload.noDate : filters.noDate;
		filters.date = payload.date !== undefined ? payload.date : filters.date;
		filters.unfinished = payload.unfinished !== undefined ? payload.unfinished : filters.unfinished;

		commit( "setFilters", filters );
	},
	updateTodo( context, payload ) {
		TodoService.update( payload ).then( () => {
			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
		} )
	},
	updateTodoWithFilters(context, payload) {
		console.log('updating', payload)
		if(payload.filters.date === 'today') {
			payload.todo.planned = new Date()
		}
		if(payload.filters.date === 'tomorrow') {
			payload.todo.planned =  moment(new Date()).add(1,'days');
		}
		if(payload.filters.date === 'someday') {
			payload.todo.planned =  'someday'
		}
		this.dispatch( "updateTodo", payload.todo );
	},

	deleteTodo( payload ) {
		TodoService.delete( payload ).then( () => {
			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
		} )
	},
	updateAfteraSorting({state}, payload) {
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
const mutations = {
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
const getters = {
	todos( state ) {
		return state.todos;
	},

	todo( state ) {
		return state.todos.find( function ( todo ) {
			return todo.id === state.selectedTodoId;
		} );
	},
	filteredTodos(state) {
		let array = state.todos;
		if( state.filters.tag ) {
			array = array.filter( todo => todo.tags.includes( state.filters.tag ) );
		}
		if( state.filters.unfinished ) {
			array = array.filter( todo => todo.done === false );
		}
		if( state.filters.project ) {
			array = array.filter( todo => todo.project === state.filters.project );
		}
		if(state.filters.noProject) {
			array = array.filter( todo => todo.project === false );
		}
		if(state.filters.noDate) {
			array = array.filter( todo => todo.planned === false );
		}
		if(state.filters.date) {
			const today = new moment();

			if(state.filters.date === 'today') {
				array = array.filter((todo) => {
					if(todo.planned) {
						const disDate = new moment(todo.planned);
						return todo.planned && (disDate.diff(today, 'days') < 0 || today.isSame(disDate, 'd'))
					} else { return false}
				})
			} else if (state.filters.date === 'tomorrow') {
				array = array.filter((todo) => {
					if(todo.planned) {
						const disDate = new moment(todo.planned);
						return todo.planned && ((disDate.diff(today, 'days') === 0 || disDate.diff(today, 'days') === 1) && !today.isSame(disDate, 'd'))
					} else { return false}
				})
			} else if (state.filters.date === 'someday') {
				array = array.filter( todo => todo.planned === 'someday' );
			}

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
