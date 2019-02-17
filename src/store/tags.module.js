import Vue from "vue";
import router from "../router.js";
import firebase from "firebase";
import store from "./index.js";
import { db } from '../main'

const initialState = {
	tags: [],
	tag: {}
};

const ID = () => {
	return '_' + Math.random().toString( 36 ).substr( 2, 9 );
};

const baseTag = ( id, userId, text ) => {
	return {
		id: id,
		userId: userId,
		text: text,
		todos: []
	}
};
export const state = { ...initialState };

export const actions = {
	createTag( { state, commit }, tag ) {

		const id = ID();

		db.collection( "tags" )
			.doc( id )
			.set( {
				id: id,
				userId: store.state.user.user.uid,
				text: tag.text,
				todos: [ tag.todoId ]
			} )
			.then( ( doc ) => {
				console.log( "Document successfully written!", doc );
				this.dispatch( "getTags" );
			} )
			.catch( ( error ) => {
				console.error( "Error writing document: ", error );
				this.dispatch( "getTags" );
			} );
	},
	addTodoIdsToTag( { state, commit }, payload ) {
		console.log('addTodoIdsToTag', payload)
		db.collection( "tags" )
			.doc( payload.doc )
			.update( {
				todos: firebase.firestore.FieldValue.arrayUnion( payload.todoId )
			} )
			.then( () => {
				this.dispatch( "getTags" );
			} )
			.catch( ( error ) => {
				this.dispatch( "getTags" );
			} );

	},
	updateTagsFromTodo( { state, commit }, todo ) {
		console.log( 'updateTagsFromTodo', todo );

		todo.tags.forEach( ( tag ) => {
			db.collection( "tags" )
				.where( "userId", "==", store.state.user.user.uid )
				.where( "text", "==", tag )
				.get()
				.then( ( doc ) => {
					if( doc.size > 0 ) {
						this.dispatch( 'addTodoIdsToTag', { doc: doc.docs[ 0 ].id, text: tag, todoId: todo.id } )
					} else {
						this.dispatch( 'createTag', {
							text: tag,
							todoId: todo.id
						} );
					}
				} ).catch( ( err ) => {
					console.error( 'error:', err )
				} )
		} )
	},
	getTags( { state, commit }, tags ) {
		return db.collection( "tags" )
			.where( "userId", "==", store.state.user.user.uid )
			.get()
			.then( function ( querySnapshot ) {
				var array = [];
				querySnapshot.forEach( function ( doc ) {
					array.push( doc.data() )
				} );
				commit( "setTags", array );
			} )
			.catch( function ( error ) {
				console.error( "Error getting documents: ", error );
			} );
	},
	getTag( { state, commit }, id ) {

		return db.collection( "tags" )
			.doc( id )
			.get()
			.then( ( doc ) => {
				commit( 'setTag', doc.data() )
			} ).catch( ( error ) => {

			} )
	},
	getTagByName( { state, commit }, text ) {

		return db.collection( "tags" )
			.where( "userId", "==", store.state.user.user.uid )
			.where( "text", "==", text )
			.get()
			.then( ( doc ) => {
				console.log( 'found some' )
			} ).catch( ( error ) => {

			} )
	},
};
export const mutations = {
	setTags( state, tags ) {
		state.tags = tags;
	},
	setTag( state, tag ) {

		state.tag = tag;
	},
	addTag( state, tag ) {
		state.tags.push( tag )
	}
};
export const getters = {
	tags( state ) {
		return state.tags;
	},
	tag( state ) {
		return state.tag;
	},
};
export default {
	state,
	actions,
	mutations,
	getters
};
