<template>
	<div class="">
		<nav class='nav nav_todo flex flex--center'>
			<div class="col col--3 button button--blue button--ic button--sm" @click="projectMenu = !projectMenu">
				<span>Move</span> <i class="ic ic--sm ic__arrow--next"></i>
			</div>
			<div class="col col--3 button button--blue button--sm" @click="remove">
				Delete
			</div>
		</nav>
		<nav class='nav nav_todo_projects flex' v-if="projectMenu">
			<h3 class='t--center col'>Move</h3>
			<div class="p--abs" @click='projectMenu = false'>
				close
			</div>
			<ul class='col col--12'>
				<li v-for="project in projects" :key="project.id" class="button button--white button--sm" @click="addToProject(project.id)">
					{{project.title}}
				</li>
			</ul>
		</nav>
	</div>
</template>
<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
	name: 'TodoItemNav',
	props: [
		'onCloseClick', 'projectMenu', 'toggle'
	],
	components: {

	},
	computed: {
		...mapState( {
			projects: state => state.project.projects
		}),
	},

	methods: {
		addToProject: function ( id ) {
			this.projectMenu = false;
			this.todo.project = id;
			this.$store.dispatch( {
				type: 'updateTodo',
				payload: this.todo
			} )
			this.$store.dispatch( 'addTodoToProject', this.todo );
		},
		remove: function () {
			if( window.confirm( "Do you really want to delete this todo?" ) ) {
				this.$store.dispatch( 'deleteTodo', this.todo );
			}
		}
	}
}
</script>
