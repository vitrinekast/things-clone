import { ApiService } from "@/common/api.service";
import { TagService } from "@/common/tag.service";
import store from "../store/index.js";
import firebase from "firebase"

import chrono from 'chrono-node'

const ID = () => {
	return '_' + Math.random().toString( 36 ).substr( 2, 9 );
};

const baseProject = ( ) => {
	const userId =  store.state.user.user.uid
	return {
		userId: userId,
		id: ID(),
		title: "",
		done: false,
		todos: [],
		notes: "",
		order: -1,
		deadline: false,
		anytime: false,
		planned: false,
		created: firebase.firestore.FieldValue.serverTimestamp(),
	}
};


export const ProjectService = {
	get() {
		return ApiService.get( "projects" );
	},
	async create() {
		const project = baseProject();
		return ApiService.post( "projects", project );
	},
	async update( payload ) {
		// const todo = parseTodo( payload );
		//
		// todo.tags.forEach( ( tag ) => {
		// 	TagService.createOrUpdate( tag, todo );
		// } )
		console.log('update service', payload)
		return ApiService.update( "projects", payload )
	},
	async updateOrder(payload) {

		// payload.forEach((elem) => {
		// 	return ApiService.update( "projects", elem )
		// })
	},
	async delete( payload ) {
		return ApiService.delete( "projects", payload )
	}
};
