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
	<h5 class='nav__title' v-if="projects">Projects</h5>
	<ul>
		<draggable class="list-group list_draggable" element="ul" v-model="projects" :options="dragOptions" @start="isDragging = true" @end="isDragging = false">
		<li class='nav__item' v-for="(project, index) in projects" :key="project.id">
			<router-link :to="{ name: 'project', params: { projectId: project.id }}">
				<span v-if="project.title">{{project.title}}</span>
				<span v-else class='t--grey'>New project</span>
			</router-link>
		</li>
		</draggable>
		<draggable v-model="projects" :options="dragOptions" @start="isDragging = true" @end="isDragging = false">
			<div class="" style='background: red; width: 100px; height: 100px;'>

			</div>
		</draggable>

	</ul>
	<div class="p--abs p--abs--bottom flex">
		<div class="col button button--grey button--bordered button--sm flex--center" @click="createProject">
			<span class='d--block'>new project</span>
		</div>
		<div class="col button button--grey button--bordered button--sm flex--center" @click="deleteAllTodos">
			<span class='d--block'>delete all todos</span>
		</div>
		<div class="col button button--grey button--bordered button--sm flex--center" @click="deleteAllTags">
			<span class='d--block'>delete all tags</span>
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
			'projects',
			'menuOpen'
		] ),
		dragOptions() {
			return {
				animation: 0,
				group: "description",
				disabled: false,
				ghostClass: "list_draggable--ghost",
				dragClass: 'list_draggable--dragging',
				dragging: false
			};
		},
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
