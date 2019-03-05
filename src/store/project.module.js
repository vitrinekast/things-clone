import store from "@/store/index.js";
import { ProjectService } from "@/common/project.service";
import router from '@/router'

const initialState = {
	projects: []
};
const state = { ...initialState };

const actions = {
	async getAllProjects( { commit } ) {
		const data = await ProjectService.getAll();
		commit( 'setProjects', data );
	},
	async getProject( { commit, state }, id ) {
		id = id ? id : state.project.id
		const data = await ProjectService.get( id );
		commit( 'setProject', data );
	},
	updateProject( { state } ) {
		ProjectService.update( state.project ).then( () => {
			this.dispatch( "getAllTodos" );
			this.dispatch( "getAllTags" );
			this.dispatch( "getProject" );
		} )
	},
	async createProject() {
		await ProjectService.create();
		this.dispatch( "getAllProjects" );
	},

	addTodoToProject( { state }, todo ) {
		const project = state.projects.find( project => project.id === todo.project );

		if( project.todos.filter( projectTodo => projectTodo.id === todo.id ).length === 0 ) {
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
	projects(state) {
		return state.projects
	}
};
export default {
	state,
	actions,
	mutations,
	getters
};
