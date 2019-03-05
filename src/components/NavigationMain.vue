<template>
<nav class='nav nav_main'>
	<h4>{{user.email}}</h4>
	<ul>
		<li class='nav__item'>
			<router-link to="/">
				<span>Log</span>
				<draggable :options="dragOptions" :date-id="'Log'" class="nav__item--drag-target"></draggable>
			</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/inbox">
				<span>Inbox</span>
				<draggable :options="dragOptions" :date-id="'Inbox'" class="nav__item--drag-target"></draggable>
			</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/today">
				<span>Today</span>
				<draggable :options="dragOptions" :date-id="'Today'" class="nav__item--drag-target"></draggable>
			</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/tomorrow">
				<span>Tomorrow</span>
				<draggable :options="dragOptions" :date-id="'Tomorrow'" class="nav__item--drag-target"></draggable>
			</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/someday">
				<span>Someday</span>
				<draggable :options="dragOptions" :date-id="'Someday'" class="nav__item--drag-target"></draggable>
			</router-link>
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
