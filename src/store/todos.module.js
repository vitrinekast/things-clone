import Vue from "vue";
import store from "./index.js";
import { db } from '../main'

const initialState = {
	todos: [],
	activeTodoId: false,
	filteredTodos: []
};

const ID = () => {
	return '_' + Math.random().toString( 36 ).substr( 2, 9 );
};
const baseTodo = ( id, userId ) => {
	return {
		userId: userId,
		id: id,
		text: "This is a new todo",
		done: false,
		notes: "",
		tags: [],
		deadline: false,
		anytime: false,
		planned: false
	}
};
export const state = { ...initialState };

export const actions = {
	getUserTodos( { state, commit } ) {
		db.collection( "todos" )
			.where( "userId", "==", store.state.user.user.uid )
			.get()
			.then( function ( querySnapshot ) {
				var array = [];
				querySnapshot.forEach( function ( doc ) {
					array.push( doc.data() )
				} );
				commit( "setUserTodos", array );
			} )
			.catch( function ( error ) {
				console.error( "Error getting documents: ", error );
			} );
	},
	getFilteredTodos( { state, commit }, filters ) {

		var query = db.collection( "todos" ).where( "userId", "==", store.state.user.user.uid );
		
		if( filters.tag ) {
			query = query.where( "tags", "array-contains", filters.tag )
		}

		query.get()
			.then( function ( querySnapshot ) {
				var array = [];
				querySnapshot.forEach( function ( doc ) {
					array.push( doc.data() )
				} );
				commit( "setUserTodos", array );
			} )
			.catch( function ( error ) {
				console.error( "Error getting documents: ", error );
			} );

	},
	createTodo( { state } ) {
		const id = ID();
		db.collection( "todos" ).doc( id ).set( baseTodo( id, store.state.user.user.uid ) )
			.then( () => {
				console.log( "Document successfully written!" );
				this.dispatch( "getUserTodos" );
			} )
			.catch( ( error ) => {
				console.error( "Error writing document: ", error );
				this.dispatch( "getUserTodos" );
			} );
	},
	deleteTodo( { state }, payload ) {

		db.collection( "todos" ).doc( payload.id ).delete().then( () => {
			this.dispatch( "getUserTodos" );
		} ).catch( ( error ) => {
			console.error( "Error removing document: ", error );
			this.dispatch( "getUserTodos" );
		} );

	},
	updateTodo( { state }, payload ) {
		console.log( 'updateTodo', payload )
		if( payload.text ) {
			var string = payload.text
			var regex = /\W(\#[a-zA-Z]+\b)(?!;)/gm;
			const matches = string.match( regex ) ? string.match( regex ) : [];

			matches.forEach( ( match ) => {

				payload.text = payload.text.replace( match, '' );
				match = match.replace( '#', '' ).trim();

				var orgTag = payload.tags.find( function ( tag ) {
					return tag === match;
				} );
				if( !orgTag ) {
					payload.tags.push( match )
				}
			} );
		}

		db.collection( "todos" )
			.doc( payload.id )
			.update( payload )
			.then( () => {
				this.dispatch( "getUserTodos" );
				this.dispatch( 'updateTagsFromTodo', payload );
			} )
			.catch( ( error ) => {
				// The document probably doesn't exist.
				this.dispatch( "getUserTodos" );
				this.dispatch( 'updateTagsFromTodo', payload );
				console.error( "Error updating document: ", error );
			} );

	},
	setActiveTodo( { state }, payload ) {
		state.activeTodoId = state.activeTodoId === payload.id ? false : payload.id;
	},

};
export const mutations = {
	setUserTodos( state, payload ) {
		state.todos = payload;
	},
	setTodoFilters( state, payload ) {
		state.filters = payload;
	},
};
export const getters = {
	todos( state ) {
		return state.todos;
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
