<template>
<div class="">

	<ol v-if="todos" class='list list--todos'>

		<draggable class="list-group" element="ul" v-model="filteredTodos" :options="dragOptions" @start="isDragging = true" @end="isDragging = false">

			<li class="list-group-item" v-for="(todo, index) in filteredTodos" :key="index">
				<div class="p--fixed p--abs--100 card__backdrop" v-if="todo.id === activeTodoId" @click="removeActiveTodo(todo)"></div>
				<todo-item v-bind:todo="todo" v-bind:index="index" :active="todo.index === activeTodoId" />
			</li>

		</draggable>
	</ol>

	<p v-if="todos.length < 1">There are now todos available</p>
</div>
</template>

<script>
// @ is an alias to /src
import TodoItem from '@/components/TodoItem';
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'

export default {
	name: 'TodoList',
	components: {
		TodoItem,
		draggable
	},
	computed: {
		// mix the getters into computed with object spread operator
		...mapGetters( [
			'todos',
			'activeTodoId',
			'filters'
		] ),
		dragOptions() {
			return {
				animation: 0,
				group: "description",
				disabled: false,
				ghostClass: "ghost"
			};
		},
		filteredTodos: {
			get() {
				let array = this.todos;
				if( this.filters.tag ) {
					array = this.todos.filter( todo => todo.tags.includes( this.filters.tag ) );
				}
				return array
			},
			set( value ) {
				let array = [];
				value.forEach( ( val, index ) => {
					array.push( {
						order: index,
						id: val.id
					} )
				} )
				this.$store.dispatch( 'updateAllTodos', array );
			}
		}
	},
	methods: {
		removeActiveTodo: function ( todo ) {
			this.$store.dispatch( 'setActiveTodo', false );
			this.$store.dispatch( 'updateTodo', todo );
		}
	},
}
</script>
