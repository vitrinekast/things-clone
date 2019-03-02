<template>
<div class="home">
	<header>
		<h2>Log</h2>
	</header>
	<Calendar />

	<Navigation-tags />

	<Notification />

	<todo-list />

</div>
</template>

<script>
// @ is an alias to /src
//
import Calendar from '@/components/Calendar';
import Notification from '@/components/Notification';
import TodoList from '@/components/TodoList';
import NavigationTags from '@/components/NavigationTags';

export default {
	name: 'home',
	components: {
		Calendar,
		NavigationTags,
		Notification,
		TodoList
	},
	mounted: function () {
		this.$store.dispatch( 'updateFilters', {
			project: false,
			tag: false,
			noProject: false,
			date: false,
			noDate: false
		 } );
	}
}
</script>
