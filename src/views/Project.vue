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
import dateFilters from '@/dateFilters';

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
		const test = dateFilters('Project', this.$route.params.projectId);
		console.log(test)
		this.updateFilters(dateFilters('Project', this.$route.params.projectId))

	},
	methods: {
		...mapActions( {
			updateProject: 'updateProject',
			'setProject': 'getProject',
			'updateFilters': 'updateFilters'
		} )
	}
}
</script>
