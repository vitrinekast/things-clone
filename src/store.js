import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import moment from "moment";
import router from "./router.js";
import firebase from "firebase";

const vuexPersist = new VuexPersist( {
	key: "my-app",
	storage: localStorage
} );

Vue.use( Vuex );

export default new Vuex.Store( {
	plugins: [ vuexPersist.plugin ],
	state: {
		todos: [],
		activeTodoId: false,
		tags: []
	},
	getters: {
		todayTodos: state => {
			const today = moment();
			return state.todos.filter( function ( todo ) {
				return todo.planned ?
					moment( todo.planned ).isBefore( today ) ||
					moment( todo.planned ).isSame( today, "day" ) :
					false;
			} );
		},
		tomorrowTodos: state => {
			const tomorrow = moment()
				.clone()
				.add( 1, "days" )
				.startOf( "day" );
			console.log( tomorrow )
			return state.todos.filter( function ( todo ) {
				console.log( todo.planned )
				return todo.planned ?
					moment( todo.planned ).isSame( tomorrow, "day" ) :
					false;
			} );
		},
		unnassignedTodos: state => {
			console.log( state.todos )
			return state.todos.filter( todo => !todo.planned );
		},
		tags: state => {
			return state.tags;
		},
		somedayTodos: state => {
			return state.todos.filter( function ( todo ) {
				return todo.anytime;
			} );
		},
		getTodoById: state => id => {
			return state.todos.find( todo => todo.id == id );
		}
	},

	
} );
