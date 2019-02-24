import { ApiService } from "@/common/api.service";
import store from "../store/index.js";

const ID = () => {
	return '_' + Math.random().toString( 36 ).substr( 2, 9 );
};

const baseTag = ( text, todoId ) => {
	return {
		id: ID(),
		userId: store.state.user.user.uid,
		text: text,
		order: -1,
		todos: [ todoId ]
	}
};

export const TagService = {
	get() {
		return ApiService.get( "tags" );
	},
	create( tagText, todo ) {
		const tag = baseTag( tagText, todo.id );
		return ApiService.post( "tags", tag );
	},
	updateTodoIdInTag( tag, todo ) {
		if( tag.todos.includes( todo.id ) ) { return false }

		tag.todos.push( todo.id );
		return ApiService.post( "tags", tag );

	},
	createOrUpdate( tagText, todo ) {
		const result = store.state.tags.tags.find( function ( tag ) {
			return tag.text === tagText
		} );
		result ? TagService.updateTodoIdInTag( result, todo ) : TagService.create( tagText, todo );
	},
	delete( payload ) {
		return ApiService.delete( "tags", payload )
	},
	cleanup() {
		let backup = store.state.tags.tags

		backup.forEach( ( elem ) => {
			elem.found = store.state.todos.todos.find( function ( todo ) {
				return todo.tags.includes( elem.text )
			} );

			if( !elem.found ) {
				TagService.delete( elem );
			}
		} )

	}
};
