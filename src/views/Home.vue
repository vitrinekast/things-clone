<template>
<div class="home">
	<header>
		<h2>Log</h2>
	</header>
	<Calendar />
	{{count}}
    {{todos}}
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
import { mapState } from 'vuex'


export default {
	name: 'home',
	components: {
		Calendar,
		NavigationTags,
		Notification,
		TodoList
	},
	computed: mapState( {
		// map this.count to store.state.count
		count: state => state.general.count,
		todos: state => state.todos.todos,

	} ),
	mounted: function () {
		// console.log(this.$store.state.general.count)
		console.log( this )
		this.$store.dispatch( 'updateFilters', { project: false, tag: false } );
	}
}
</script>
