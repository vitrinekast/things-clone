<template>
<div class="home">
	<header>
		<h2>Log</h2>
	</header>
	<Calendar />

	{{tweets}}
	{{currentTodo}}
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
import { mapState, mapGetters } from 'vuex'
import { db } from '@/db'

export default {
	name: 'home',
	components: {
		Calendar,
		NavigationTags,
		Notification,
		TodoList
	},
	data: function () {
		return {
			things: [],
			currentTodo: null
		}
	},
	computed: mapGetters(['tweets']),

	created() {
		this.$store.dispatch( 'setTweetref', db.collection( 'tweets' ) )
	}
}
</script>
