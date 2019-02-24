<template>
<nav class='nav nav_main'>
	<ul>
		<li class='nav__item'>
			<router-link to="/">Backlog</router-link>
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
	<h5 class='nav__title' v-if="projects">Projects</h5>
	<ul>
		<li class='nav__item' v-for="(project, index) in projects" :key="index">
			<router-link :to="{ name: 'project', params: { projectId: project.id }}">
				<span v-if="project.title">{{project.title}}</span>
				<span v-else class='t--grey'>new project</span>
			</router-link>
		</li>
	</ul>
	<div class="p--abs p--abs--bottom flex">
		<div class="col button button--blue button--sm flex--center" @click="createProject">
			<span class='d--block'>new project</span>
		</div>
		<div class="col button button--blue button--sm flex--center" @click="deleteAllTodos">
			<span class='d--block'>delete all todos</span>
		</div>
		<div class="col button button--blue button--sm flex--center" @click="deleteAllTags">
			<span class='d--block'>delete all tags</span>
		</div>
	</div>
</nav>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	name: 'MainNavigation',
	computed: {
		...mapGetters( [
			'user',
			'tags',
			'projects',
			'menuOpen'
		] )
	},
	methods: {
		createProject: function () {
			this.$store.dispatch( 'updateMenuOpen', false )
			this.$store.dispatch( 'createProject' );
		},
		deleteAllTodos: function () {
			this.$store.dispatch( 'updateMenuOpen', false )
			this.$store.dispatch( 'deleteAllTodos' );
		},
		deleteAllTags: function () {
			this.$store.dispatch( 'updateMenuOpen', false )
			this.$store.dispatch( 'deleteAllTags' );
		}
	}
}
</script>
