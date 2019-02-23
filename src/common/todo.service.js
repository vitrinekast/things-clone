import { ApiService } from "@/common/api.service";
import { TagService } from "@/common/tag.service";
import store from "../store/index.js";

import chrono from 'chrono-node'

const ID = () => {
	return '_' + Math.random().toString( 36 ).substr( 2, 9 );
};

const baseTodo = ( userId ) => {
	return {
		userId: userId,
		id: ID(),
		text: "This is a new todo",
		done: false,
		notes: "",
		tags: [],
		deadline: false,
		anytime: false,
		planned: false,
		created: new Date()
	}
};

const getTags = ( string ) => {
	const regex = /\W(\#[a-zA-Z]+\b)(?!;)/gm;

	let matches = string.match( regex ) ? string.match( regex ) : [];
	matches = matches.map( match => match.replace( '#', '' ).trim() );

	return matches
}

const parseTodo = ( todo ) => {
	var newTags = getTags( todo.text );
	newTags.forEach((tag) => {
		if(!todo.tags.includes(tag)) { todo.tags.push(tag) }
	})
	todo.tags.forEach((tag) => {
		todo.text = todo.text.replace('#' + tag, '');
	})
	todo.planned = chrono.parseDate( todo.text )
	todo.text = todo.text.trim();

	return todo
}

export const TodoService = {
	get() {
		return ApiService.get( "todos" );
	},
	async create() {
		const todo = baseTodo( store.state.user.user.uid );
		return ApiService.post( "todos", todo );
	},
	async update( payload ) {
		const todo = parseTodo( payload );

		todo.tags.forEach( ( tag ) => {
			TagService.create( tag, todo );
		} )
		console.log('updating this: ', todo)
		return ApiService.post( "todos", payload )
	},
	async delete( payload ) {
		return ApiService.delete( "todos", payload )
	}
};
