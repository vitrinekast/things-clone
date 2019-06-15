<template>
<nav class='nav nav_main'>
	<h3 v-if="user">{{user.email}}</h3>
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
		<li class='nav__item' v-for="project in projects" :key="project.id">

			<router-link v-if="project.id" :to="{ name: 'project', params: { projectId: project.id }}">
				<span class='flex--center--vert' v-if="project.text"><i class="ic--material material-icons">folder</i>{{project.text}}</span>
				<span v-else class='t--grey'>New project</span>
				<draggable :options="dragOptions" :project-id="project.id" class='nav__item--drag-target'></draggable>
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
// import { mapGetters, mapActions } from 'vuex'

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
		user() {
			return this.$store.getters[ 'users/authUser' ]
		},
		projectCount() {
			return this.projects ? Object.keys( this.projects ).length : 0
		},
		dragOptions() {
			return {
				group: "todo"
			};
		},
	},
	mounted () {		
		// this.fetchUser()
	},
	methods: {
		// ...mapActions( 'users', [ 'fetchUser' ] ),

		createProject: function () {
			
			// this.$store.dispatch( 'updateMenuOpen', false )
			this.$store.dispatch( 'projects/createProject' ).then((item) => {
				this.$router.push( {name: 'project', params: {projectId: item.id} } )
			});
		},
	}
}
</script>
