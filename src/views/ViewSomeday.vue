<template>
<div class="home" v-if="todos">
	<header class='header_page'>
		<h2>{{title}}</h2>
	</header>

	<TodoListItem :todo="newTodo" :newItem='true' :opened='true' @update="updateNewTodo"></TodoListItem>
	<NavigationTags :tags="tags" @filter="filterTodos" @clearFilter="clearFilter"/>
	
	<TodoListByProject :todos='todosByProject' />
  
</div>
</template>

<script>
import OverviewMixin from '@/views/OverviewMixin'

export default {
	mixins: [OverviewMixin],
	data () {
		return {
			title: '⭐️ Someday',
			filters: {
				someday: true,
				done: false
			}
		}
	}
	
}
</script>
