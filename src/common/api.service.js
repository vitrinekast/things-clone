import { db } from '../db'
import store from "../store/index.js";

const getDataFromSnapshot = ( querySnapshot ) => {
	let array = [];
	const dateItems = ['created', 'planned'];
	querySnapshot.forEach( function ( doc ) {
		let data = doc.data();
		dateItems.forEach((date)=> {
			if(data[date]) {
				if(data[date].toDate) {
					data[date] = data[date].toDate()
				}
			}
		})

		array.push( data )
	} );
	return array
};
const getDataFromDoc = ( querySnapshot ) => {

	const dateItems = ['created', 'planned'];
	let data = querySnapshot.data();
	dateItems.forEach((date)=> {
		if(data[date]) {
			if(data[date].toDate) {
				data[date] = data[date].toDate()
			}
		}
	})
	return data
};

export const ApiService = {

	async get( resource ) {
		const uid = store.state.user.user.uid;

		return db.collection( resource ).where( "userId", "==", uid ).orderBy("order").get()
			.then( function ( querySnapshot ) {
				return getDataFromSnapshot( querySnapshot )
			} )
			.catch( function ( error ) {
				throw new Error( error );
			} );
	},
	async getDoc( resource, name ) {
		return db.collection( resource ).doc(name).get()
			.then( function ( querySnapshot ) {
				return getDataFromDoc( querySnapshot )
			} )
			.catch( function ( error ) {
				throw new Error( error );
			} );
	},
	post( resource, params ) {
		console.log('post', resource, params)
		console.trace();
		db.collection( resource ).doc( params.id ).set( params )
			.then( ( data ) => {
				return data
			} )
			.catch( ( error ) => {
				throw new Error( error );
			} );
	},
	async update( resource, params ) {

        return db.collection( resource ).doc( params.id ).update( params )
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
