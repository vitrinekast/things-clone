<template>
<div class="home" v-if="todos">
	<header class='header_page'>
		<h2>{{title}}</h2>
	</header>
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
			title: 'Inbox ',
			filters: {
				project: false,
        deadline: false,
        done: false
			}
		}
	}
	
}
</script>
