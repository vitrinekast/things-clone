import { ApiService } from "@/common/api.service";
import { TagService } from "@/common/tag.service";
import store from "../store/index.js";
import firebase from "firebase"
import chrono from 'chrono-node'

const ID = () => {
	return '_' + Math.random().toString( 36 ).substr( 2, 9 );
};

const baseTodo = () => {
	const userId = store.state.user.user.uid;
	const tag = store.state.todos.filters.tag;
	const project = store.state.todos.filters.project
	return {
		userId: userId,
		id: ID(),
		text: "",
		done: false,
		notes: "",
		order: -1,
		project: project,
		tags: tag ? [tag] : [],
		deadline: false,
		anytime: false,
		planned: false,
		created: firebase.firestore.FieldValue.serverTimestamp(),
	}
};

const getTags = ( string ) => {
	const regex = new RegExp( /(#[a-zA-Z]+\b)(?!;)/gm );

	let matches = string.match( regex ) ? string.match( regex ) : [];
	matches = matches.map( match => match.replace( '#', '' ).trim() );

	return matches
}

const parseTodo = ( todo ) => {
	var newTags = getTags( todo.text );
	const dateResult = chrono.parse( todo.text );

	newTags.forEach( ( tag ) => {
		if( !todo.tags.includes( tag ) ) { todo.tags.push( tag ) }
	} )
	todo.tags.forEach( ( tag ) => {
		todo.text = todo.text.replace( '#' + tag, '' );
	} )
	if( dateResult[ 0 ] ) {
		todo.planned = chrono.parseDate( todo.text )
		todo.text = todo.text.replace( dateResult[ 0 ].text, '' );

	}
	todo.text = todo.text.trim();

	return todo
}

export const TodoService = {
	get() {
		return ApiService.get( "todos" );
	},
	async create() {
		const todo = baseTodo();
		console.log('creating a new one', todo)
		return ApiService.post( "todos", todo );
	},
	async update( payload ) {
		const todo = parseTodo( payload );

		todo.tags.forEach( ( tag ) => {
			TagService.createOrUpdate( tag, todo );
		} )
		TagService.cleanup();
		return ApiService.post( "todos", payload )
	},
	async updateOrder( payload ) {

		return payload.forEach( ( elem ) => {
			return ApiService.update( "todos", elem )
		} )
	},
	async delete( payload ) {
		return ApiService.delete( "todos", payload )
	}
};
