import Vue from "vue";
import router from "../router.js";
import firebase from 'firebase/app';;
import store from "./index.js";
import { db } from '../main';
import { ApiService } from "@/common/api.service";
import { TagService } from "@/common/tag.service";

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
	async getAllTags( { state, commit } ) {
		if( !store.state.user.user ) { return false }
		const data = await TagService.get();
		commit( 'setTags', data );
	},
	deleteAllTags( { state, commit } ) {
		state.tags.forEach((tag) => {
			return TagService.delete( tag );
		})

		this.dispatch( "getAllTags" );
	}
};
export const mutations = {
	setTags( state, tags ) {
		state.tags = tags;
	},
	// setTag( state, tag ) {
	//
	// 	state.tag = tag;
	// },
	// addTag( state, tag ) {
	// 	state.tags.push( tag )
	// }
};
export const getters = {
	tags( state ) {
		return state.tags;
	},
	// tag( state ) {
	// 	return state.tag;
	// },
};
export default {
	state,
	actions,
	mutations,
	getters
};
