<template>
<div class="">

	<ol v-if="todos" class='list list--todos'>

		<draggable class="list-group list_draggable" element="ul" v-model="filteredTodos" :options="dragOptions" @end="onEnd">

			<transition-group type="transition" :name="'flip-list'">
				<li class="list-group-item" v-for="(todo, index) in filteredTodos" :todo-id="todo.id" :key="todo.id">
					<div class="p--fixed p--abs--100 card__backdrop" v-if="todo.id === activeTodoId" @click="removeActiveTodo(todo)"></div>
					<todo-item v-bind:todo="todo" v-bind:index="index" :active="todo.index === activeTodoId" />
				</li>
			</transition-group>
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
		...mapGetters( [
			'todos',
			'activeTodoId',
			'filters'
		] ),
		dragOptions() {
			return {

				group: { name: 'todo', pull: 'clone', put: false },
				ghostClass: "list_draggable--ghost",
				dragClass: 'list_draggable--dragging',

			};
		},
		filteredTodos: {
			get() {
				let array = this.todos;
				if( this.filters.tag ) {
					array = this.todos.filter( todo => todo.tags.includes( this.filters.tag ) );
				}
				if( this.filters.project ) {
					array = this.todos.filter( todo => todo.project === this.filters.project );
				}
				return array
			},
			set( value ) {
				let array = [];
				value.forEach( ( val, index ) => {
					val.order = index;
					array.push( {
						order: index,
						id: val.id
					} )
				} )
				this.$store.dispatch( 'updateAllTodos', { changes: array, allData: value } );
			}
		}
	},
	methods: {
		removeActiveTodo: function ( todo ) {
			this.$store.dispatch( 'setActiveTodo', false );
			this.$store.dispatch( 'updateTodo', todo );
		},
		onEnd: function ( e ) {
			const projectId = e.to.getAttribute( 'project-id' );
			if( !projectId ) { return false }

			let todo = this.todos.find( ( todo ) => { return todo.id === e.item.getAttribute( 'todo-id' ) } );
			todo.project = e.to.getAttribute( 'project-id' );

			this.$store.dispatch( 'updateTodo', todo );
			this.$store.dispatch( 'addTodoToProject', todo );
		}
	},
}
</script>
