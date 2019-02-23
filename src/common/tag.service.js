import { ApiService } from "@/common/api.service";
import store from "../store/index.js";

const ID = () => {
	return '_' + Math.random().toString( 36 ).substr( 2, 9 );
};

const baseTag = ( userId, text, todoId ) => {
	return {
		id: ID(),
		userId: userId,
		text: text,
		todos: [ todoId ]
	}
};

export const TagService = {
	get() {
		return ApiService.get( "tags" );
	},
	create( tagText, todo ) {

		var result = store.state.tags.tags.find( function ( tag ) {
			return tag.text === tagText
		} );

		if( result ) {
			if( !result.todos.includes( todo.id ) ) {
				result.todos.push( todo.id );
				return ApiService.post( "tags", result );
			}

		} else {
			var tag = baseTag( store.state.user.user.uid, tagText, todo.id );
			return ApiService.post( "tags", tag );
		}
	},
	delete( payload ) {
		return ApiService.delete( "tags", payload )
	}
};
