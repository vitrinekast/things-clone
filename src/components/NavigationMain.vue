<template>
<nav class='nav nav_main'>
	<ul>
		<li class='nav__item'>
			<router-link to="/">Log</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/inbox">Inbox</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/today">Today</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/tomorrow">Tomorrow</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/someday">Someday</router-link>
		</li>
		<li class='nav__item' v-if='!user'>
			<router-link to="/login">Login</router-link>
		</li>
	</ul>

	<h5 class='nav__title' v-if="projects.length > 0">Projects</h5>

	<ul v-if="projects.length > 0">
		<li class='nav__item' v-for="project in projects" :key="project.id">

			<router-link :to="{ name: 'project', params: { projectId: project.id }}">
				<span v-if="project.title">{{project.title}}</span>
				<span v-else class='t--grey'>New project</span>
				<span>{{project.todos.length}}</span>
				<draggable  :options="dragOptions" :project-id="project.id" class='nav__item--drag-target'></draggable>
			</router-link>
		</li>
	</ul>
	<div class="p--abs p--abs--bottom flex">
		<div class="col button button--grey button--bordered button--sm flex--center" @click="createProject">
			<span class='d--block'>new project</span>
		</div>
		<div class="col button button--grey button--bordered button--sm flex--center" @click="deleteAllData">
			<span class='d--block'>delete all data</span>
		</div>
	</div>
</nav>
</template>
<script>
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable'
export default {
	name: 'MainNavigation',
	components: {
		draggable
	},

	computed: {
		...mapGetters( [
			'user',
			'tags',
			'menuOpen'
		] ),
		projects: {
			get() {
				return this.$store.getters.projects
			},
			set() {
				this.$store.dispatch( 'setProjects', this.projects );
			}
		},
		dragOptions() {
			return {
				group: "todo"
			};
		},
	},
	methods: {
		createProject: function () {
			this.$store.dispatch( 'updateMenuOpen', false )
			this.$store.dispatch( 'createProject' );
		},
		deleteAllData: function () {
			this.$store.dispatch( 'updateMenuOpen', false )
			this.$store.dispatch( 'deleteAllTodos' );
			this.$store.dispatch( 'deleteAllTags' );
			this.$store.dispatch( 'deleteAllProjects' );
		}
	}
}
</script>
