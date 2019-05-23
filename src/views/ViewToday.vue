<template>
<div class="home" v-if="todos">
	<header class='header_page'>
		<h2>{{title}}</h2>
	</header>

	<TodoListItem :todo="newTodo" :newItem='true' :opened='true' @update="updateNewTodo"></TodoListItem>
	<NavigationTags :tags="tags" @filter="filterTodos" @clearFilter="clearFilter"/>
	<ProjectList :todos='todos' />
  
</div>
</template>

<script>
import OverviewMixin from '@/views/OverviewMixin'

export default {
	mixins: [OverviewMixin],
	data () {
		return {
			title: '⭐️ Today',
			filters: {
				today: true,
				done: false
			}
		}
	}
	
}
</script>
