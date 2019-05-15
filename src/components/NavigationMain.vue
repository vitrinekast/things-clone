<template>
<nav class='nav nav_main'>
	<ul>
		<li class='nav__item'>
			<router-link to="/">
				<span>Log</span>
			</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/inbox">
				<span>Inbox</span>
				<draggable :options="dragOptions" :date="'inbox'" class="nav__item--drag-target"></draggable>
			</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/today">
				<span>Today</span>
				<draggable :options="dragOptions" :date="'today'" class="nav__item--drag-target"></draggable>
			</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/tomorrow">
				<span>Tomorrow</span>
				<draggable :options="dragOptions" :date-id="'tomorrow'" class="nav__item--drag-target"></draggable>
			</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/someday">
				<span>Someday</span>
				<draggable :options="dragOptions" :date-id="'Someday'" class="nav__item--drag-target"></draggable>
			</router-link>
		</li>
		<li class='nav__item'>
			<router-link to="/login">Login</router-link>
		</li>
	</ul>

	<h5 class='nav__title' v-if="projects.length > 0">Projects</h5>

	<ul v-if="projectCount > 0">
		<li class='nav__item' v-for="project in projects" :key="project.id" >

			<router-link v-if="project['.key']" :to="{ name: 'project', params: { projectId: project.id }}">
				<span class='flex--center--vert' v-if="project.title"><i class="ic--material material-icons">folder</i>{{project.title}}</span>
				<span v-else class='t--grey'>New project</span>
				<draggable  :options="dragOptions" :project-id="project.id" class='nav__item--drag-target'></draggable>
			</router-link>
		</li>
	</ul>
	<div class="p--abs p--abs--bottom flex">
		<div class="col button button--grey button--bordered button--sm flex--center" @click="createProject">
			<span class='d--block'>new project</span>
		</div>
	</div>
</nav>
</template>
<script>
import draggable from 'vuedraggable'
export default {
	name: 'MainNavigation',
	props: {
		projects: {
			required: true
		}
	},
	components: {
		draggable
	},

	computed: {
		projectCount() {
			return this.projects? Object.keys(this.projects).length : 0
		},
		// ...mapGetters( [
		// 	'projects'
		// ] ),
		// ...mapState( [
		// 	'user',
		// 	'tags',
		// 	'menuOpen'
		// ] ),
		//
		dragOptions() {
			return {
				group: "todo"
			};
		},
	},
	methods: {
		createProject: function () {
			console.log('TODO: create new project')
			// this.$store.dispatch( 'updateMenuOpen', false )
			// this.$store.dispatch( 'createProject' );
		},
	}
}
</script>
