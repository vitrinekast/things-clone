import store from "@/store/index.js";
import { ProjectService } from "@/common/project.service";
const initialState = {
	projects: []
};
export const state = { ...initialState };
export const actions = {
	async getAllProjects( { commit } ) {
		if( !store.state.user.user ) { return false }
		const data = await ProjectService.get();
		commit( 'setProjects', data );
	},
	async getProject( { commit } ) {
		const data = await ProjectService.get();
		commit( 'setProject', data );
	},
	updateProject( context, payload ) {
		ProjectService.update( payload ).then( () => {
			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
			this.dispatch( "getProject", payload.id );
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
export const mutations = {
	setProjects( state, project ) {
		state.projects = project;
	},
	setProject( state, project ) {
		state.project = project;
	},
};
export const getters = {
	projects( state ) {
		return state.projects;
	},
	project( state ) {
		return state.project;
	}
};
export default {
	state,
	actions,
	mutations,
	getters
};
