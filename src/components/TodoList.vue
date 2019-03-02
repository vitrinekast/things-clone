<template>
<div class="">
	<ol v-if="todos" class='list list--todos'>
		<div class="p--fixed p--abs--100 card__backdrop" v-if='selectedTodoId' @click="setSelectedTodo(false)"></div>
		<transition-group name='fade'>
			<li v-for="todo in todos" :key="todo.id">
				<todo-item :todo="todo"></todo-item>
			</li>
		</transition-group>
	</ol>
	<p v-if="todos.length < 1">There are now todos available</p>
</div>
</template>
<script>
// @ is an alias to /src
import { mapGetters, mapState, mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem';

export default {
	name: 'TodoList',
	components: {
		TodoItem
	},
	computed: {
		...mapGetters( {
			todos: 'filteredTodos',
		} ),
		...mapState( {
			selectedTodoId: state => state.todos.selectedTodoId,
		} )
	},
	methods: {
		...mapActions( {
			setSelectedTodo: 'setSelectedTodo'
		} )
	},
}
</script>
