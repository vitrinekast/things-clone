<template>
<div class="" v-if="todos">

	<ul v-if="todoItemCount > 0">
		<DraggableTodoList :list='todos' @update="update">
			<li v-for="todo in todos" :key="todo.id" :id="todo.id">
				<TodoListItem :todo="todo" :opened='todo.id === openTodo' @update="update" @toggle="onTodoToggle" @remove="remove"></TodoListItem>
			</li>
		</DraggableTodoList>
	</ul>
	<p v-else>There are now todos available</p>
	
</div>


<!-- <div class="">
		<div class="p--fixed p--abs--100 card__backdrop" v-if='selectedTodoId' @click="setSelectedTodo(false)"></div>

		<div class="" v-if="grouped">
			<div class="" v-if="todos.find(todo => todo.title === false)">
				<todo-list-list v-bind:value="todos.find(todo => todo.title === false).items"></todo-list-list>
			</div>

			<div class="" v-for="project in todos.filter(todo => todo.title !== false)" :key="project.id">
				<router-link v-if="project.title" :to="{ name: 'project', params: { projectId: project.id }}">
					<h4 class='list__title flex--center--vert'><i class="ic--material material-icons">folder</i>{{project.title}}</h4>
				</router-link>

				<todo-list-list v-bind:value="project.items"></todo-list-list>

			</div>
		</div>
		<div class="" v-else>

			<todo-list-list v-bind:value="todos"></todo-list-list>

		</div>

	</div> -->
</template>
<script>
import { mapActions } from 'vuex'
import TodoListItem from '@/components/TodoListItem'
import DraggableTodoList from '@/components/DraggableTodoList'
// import TodoListList from '@/components/TodoListList';

export default {
	name: 'TodoList',
	components: {
		TodoListItem,
		DraggableTodoList
		// TodoListList
	},
	props: [ 'todos' ],
	computed: {
		todoItemCount() {
			return this.todos ? Object.keys( this.todos ).length : 0
		}
		// ...mapState({
		// 	selectedTodoId: state => state.todos.selectedTodoId,
		// 	todos: state => state.todos.todos,
		// 	projects: state => state.project.projects,
		// 	filters: state => state.todos.filters
		// }),
		// todos: {
		// 	get() {
		// 		if (this.grouped) {
		// 			return this.$store.getters.filteredTodosByProject
		// 		} else {
		// 			return this.$store.getters.filteredTodos
		// 		}
		// 	},
		// 	set(value) {
		// 		console.log('set', value)
		// 	}
		// }
	},
	data () {
		return {
			openTodo: false
		}
	},
	
	methods: {
		...mapActions( 'todos', [ 'updateTodo', 'removeTodo' ] ),
		...mapActions( 'projects', [ 'addTodoToProject' ] ),
		onTodoToggle (payload) {
			const todoId = payload.todo['.key'];
			this.openTodo = this.openTodo === todoId ? false : todoId;			
		},
		update( payload ) {
			this.updateTodo( { item: payload.todo, itemId: payload.todo[ '.key' ] } )
			if(payload.projectId) {
					this.addTodoToProject( payload )
			}
		},
		remove( payload ) {
			this.removeTodo( { item: payload.todo, itemId: payload.todo[ '.key' ] } )
		},

	}
}
</script>
