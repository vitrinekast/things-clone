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

</template>
<script>
import { mapActions } from 'vuex'
import TodoListItem from '@/components/TodoListItem'
import DraggableTodoList from '@/components/DraggableTodoList'
import { isDescendant } from '@/helpers'
export default {
	name: 'TodoList',
	components: {
		TodoListItem,
		DraggableTodoList
	},
	props: [ 'todos' ],
	computed: {
		todoItemCount() {
			return this.todos ? Object.keys( this.todos ).length : 0
		}
	},
	data () {
		return {
			openTodo: false
		}
	},
	created() {
		// window.addEventListener('click', this.onWindowClick, true)
	},
	destroyed() {
		// window.removeEventListener('click', this.onWindowClick)
	},
	methods: {
		...mapActions( 'todos', [ 'updateTodo', 'removeTodo' ] ),
		...mapActions( 'projects', [ 'addTodoToProject' ] ),
		
		onTodoToggle (payload) {
			this.openTodo = this.openTodo === payload.todo.id ? false : payload.todo.id;			
		},
		onWindowClick(e) {
			const activeElem = this.$el.querySelector('#' + this.openTodo);
			if(activeElem) {
					if(!isDescendant({parent: activeElem, child: e.target})) {
						this.openTodo = false
					}
			}
    },
		update( payload ) {
			console.log(payload)
			this.updateTodo( { item: payload.todo } )
			// if(payload.projectId) {
			// 		this.addTodoToProject( payload )
			// }
		},
		remove( payload ) {
			this.removeTodo( { item: payload.todo } )
		},

	}
}
</script>
