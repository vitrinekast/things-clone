import store from "@/store/index.js";
import { GETALL, GET, UPDATE, DELETE, CREATE, ADD_TODO_TO_PROJECT } from "@/common/config"
import { ProjectService } from "@/common/project.service";
import router from '@/router'

const initialState = {
	projects: []
};
const state = { ...initialState };
const actions = {
	async getAllProjects( { commit } ) {
		if( !store.state.user.user ) { return false }
		const data = await ProjectService.get();
		commit( 'setProjects', data );
	},
	async getProject( { commit } ) {
		const data = await ProjectService.get();
		commit( 'setProject', data );
	},
	updateProject( { state } ) {
		ProjectService.update( state.project ).then( ( ) => {

			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
			this.dispatch( "getProject", state.project.project.id );

		} )
	},
	deleteAllProjects( { state } ) {
		state.projects.forEach( ( project ) => {
			return ProjectService.delete( project );
		} )
		this.dispatch( "getAllProjects" );
	},
	async createProject() {
		if( !store.state.user.user ) { return false }
		await ProjectService.create();
		this.dispatch( "getAllProjects" );
	},

	setProjectById( { state, commit }, payload ) {
		commit( 'setProject', state.projects.find( ( project ) => {
			return project.id === payload
		} ) );
	},

	addTodoToProject( { state }, todo ) {

		const project = state.projects.find( ( project ) => {
			return project.id === todo.project
		} )
		if( project.todos.filter( t => t.id === todo.id ).length === 0 ) {
			project.todos.push( todo.id )
		}
		ProjectService.update( project ).then( () => {
			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
		} )
	}
};
const mutations = {
	setProjects( state, project ) {
		state.projects = project;
	},
	setProject( state, project ) {
		state.project = project;
	},
};
const getters = {
	projects( state ) {
		return state.projects;
	},
	project( state ) {
		return state.projects.find( ( project ) => {
			return project.id === router.currentRoute.params.projectId
		} )
	}
};
export default {
	state,
	actions,
	mutations,
	getters
};
