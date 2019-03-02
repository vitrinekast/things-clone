<template>
<div class="home">
	<header>
		<h2><input type="text" v-model="project.title" placeholder="New Project" name="" value="" @blur="updateProject"></h2>
	</header>
	<Calendar />

	<Navigation-tags />

	<Notification />

	<todo-list />

</div>
</template>

<script>
// @ is an alias to /src

import Calendar from '@/components/Calendar';
import Notification from '@/components/Notification';
import TodoList from '@/components/TodoList';
import NavigationTags from '@/components/NavigationTags';
import { mapState, mapActions } from 'vuex'

export default {
	name: 'home',
	components: {
		Calendar,
		NavigationTags,
		Notification,
		TodoList
	},
	computed: {
		...mapState( {
			project: state => state.project.project
		} )
	},
	created: function () {
		this.setProject(this.$route.params.projectId);
		this.updateFilters({project: this.project.id})
	},
	methods: {
		...mapActions( {
			updateProject: 'updateProject',
			'setProject': 'setProjectById',
			'updateFilters': 'updateFilters'
		} )
	}
}
</script>
