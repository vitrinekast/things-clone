<template>
<div class="home" v-if="project">
	<header class='header_page'>
		<h2 class='flex--center--vert'>
			<i class="ic--material material-icons">folder</i>
			<input type="text" v-model="project.text" placeholder="New Project" name="" value="" @blur="onBlur">
		</h2>
	</header>
  
	<TodoListItem :todo="newTodo" :newItem='true' :opened='true' @update="updateNewTodo"></TodoListItem>
	
  <NavigationTags :tags="tags" @filter="filterTodos" @clearFilter="clearFilter" />

	<TodoList :todos="filteredTodos"/>
</div>
</template>

<script>
import OverviewMixin from '@/views/OverviewMixin'
import { mapActions } from 'vuex'

export default {
	props: [ 'projectId' ],
	mixins: [ OverviewMixin ],
	data() {
		return {
			filters: {
				project: false,
				done: false 
			}
		}
	},
	computed: {
		project() {
			return this.$store.getters[ 'projects/getProjectById' ]( this.projectId )
		},
		todosByIds() {
			return this.$store.getters[ 'todos/getTodosByIds' ]( this.project.todos )
		},
	},
created () {
  this.filters.project = this.projectId
},
	methods: {
		...mapActions( 'projects', [ 'updateProject' ] ),
		onBlur() {
			this.updateProject( { item: this.project, itemId: this.project[ '.key' ] } )
		}
	},

}
</script>
