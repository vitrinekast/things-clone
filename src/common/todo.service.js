import { ApiService } from "@/common/api.service";
import { TagService } from "@/common/tag.service";
import store from "../store/index.js";
import firebase from "firebase"
import chrono from 'chrono-node'
import _ from 'underscore';
import moment from 'moment';

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
		notes: false,
		order: -1,
		project: project === undefined || project === false ? false : project,
		tags: project === undefined || project === false ? [] : [ tag ],
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
		console.log( 'create', todo )
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
	},
	filter( filters, todos ) {

		const today = new moment();
		if( filters.tag !== undefined ) {
			todos = todos.filter( todo => todo.tags.includes( filters.tag ) );
		}
		if( filters.done !== undefined ) {
			todos = todos.filter( todo => todo.done === filters.done );
		}
		if( filters.project !== undefined ) {
			todos = todos.filter( todo => todo.project === filters.project );
		}

		if( filters.date !== undefined ) {
			todos = todos.filter( ( todo ) => {

				if( filters.date === 'today' && todo.planned ) {
					const disDate = new moment( todo.planned );
					return todo.planned && ( disDate.diff( today, 'days' ) < 0 || today.isSame( disDate, 'd' ) )
				} else if( filters.date === 'tomorrow' && todo.planned ) {
					const disDate = new moment( todo.planned );
					return todo.planned && ( ( disDate.diff( today, 'days' ) === 0 || disDate.diff( today, 'days' ) === 1 ) && !today.isSame( disDate, 'd' ) )
				} else {
					return todo.planned === filters.date
				}
			} )
		}


		return todos
	},
	setDateFromDateType( type ) {
		if( type === 'today' ) {
			return new Date()
		} else if( type === 'tomorrow' ) {
			return moment( new Date() ).add( 1, 'days' );
		} else if( type === 'someday' ) {
			return 'someday'
		} else {
			return false
		}
	},

	groupByProject( todos ) {
		todos = _.sortBy( todos, 'created' );
		let result = _.groupBy( todos, 'project' );

		for( var item in result ) {
			let project = store.state.project.projects.find( project => project.id === item );

			if( !project ) {
				project = {};
				project.title = false;
			}

			project.items = result[ item ];
			result[ item ] = project
		}

		result = _.sortBy( result, 'title' );


		return result;

	}


};
