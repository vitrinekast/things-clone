<template>
<div class="home">

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
	mixins: [ OverviewMixin ],
	data() {
		return {
			title: 'Log ',
			filters: {}
		}
	}

}
</script>
