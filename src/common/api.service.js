import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { db } from '../main'
import store from "../store/index.js";

export const ApiService = {
	getDataFromSnapshot( querySnapshot ) {
		let array = [];
		querySnapshot.forEach( function ( doc ) {
			array.push( doc.data() )
		} );
		return array
	},
	async get( resource, slug = "" ) {
		const uid = store.state.user.user.uid;
        
		return db.collection( resource ).where( "userId", "==", uid ).get()
			.then( function ( querySnapshot ) {
				return ApiService.getDataFromSnapshot( querySnapshot )
			} )
			.catch( function ( error ) {
				throw new Error( error );
			} );
	},
	post( resource, params ) {

		db.collection( resource ).doc( params.id ).set( params )
			.then( ( data ) => {
				return data
			} )
			.catch( ( error ) => {
				throw new Error( error );
			} );
	},
	update( resource, params ) {

        db.collection( resource ).doc( params.id ).update( params )
			.then( ( data ) => {
				return data
			} )
			.catch( ( error ) => {
				throw new Error( error );
			} );
	},
	delete( resource, params ) {
		db.collection( resource ).doc( params.id ).delete()
			.then( ( data ) => {
				return data
			} )
			.catch( ( error ) => {
				throw new Error( error );
			} );

	}
};
