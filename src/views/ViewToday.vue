<template>
<div class="home" v-if="todos">
	<header class='header_page'>
		<h2>⭐️ Today</h2>
	</header>

	<TodoListItem :todo="newTodo" :opened='true' @update="updateNewTodo"></TodoListItem>

	<ProjectList :todos='todos' />
  
</div>
</template>

<script>
// @ is an alias to /src

// import Calendar from '@/components/Calendar';
// import Notification from '@/components/Notification';
import TodoList from '@/components/TodoList';
import TodoListItem from '@/components/TodoListItem';
import NewTodo from '@/components/NewTodo';
import ProjectList from '@/components/ProjectList';
// import NavigationTags from '@/components/NavigationTags';
import {
	mapActions
} from 'vuex'
// import dateFilters from '@/dateFilters';

export default {
	components: {
		// Calendar,
		// NavigationTags,
		// Notification,
		TodoList,
		TodoListItem,
		NewTodo,
		ProjectList
	},
	computed: {
		todos() {
			return this.$store.getters[ 'todos/filteredTodos' ]( {
				today: true
			} )
		},
		projects() {
			let ids = this.todos.map( todo => todo.project );
			return this.$store.getters[ 'projects/projectsWithTodoIds' ]( ids )
		},
	},
	data() {
		return {
			newTodo: {
				deadline: new Date(),
				text: ''
			}
		}
	},
	methods: {
		...mapActions( 'todos', [ 'fetchAllTodos', 'createTodo' ] ),
		...mapActions( 'projects', [ 'fetchAllProjects' ] ),
    
		updateNewTodo( payload ) {
			this.createTodo( { item: payload.todo } )
      this.newTodo.text = ''
		}
	},
	created() {
		this.fetchAllProjects()
		this.fetchAllTodos()
		// .then((projects) => {
		//   return Promise.all(projects.docs.map((project) => {
		//     this.fetchTodosByDate({date: new Date(), projectId: project.id })
		//   }))
		// })
	}
}
</script>
