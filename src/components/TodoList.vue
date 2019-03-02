<template>
<div class="">
	<ol v-if="filteredTodos" class='list list--todos' >
		<div class="p--fixed p--abs--100 card__backdrop" v-if='selectedTodoId' @click="setSelectedTodo(false)"></div>
		<draggable v-model="filteredTodos" :options="dragOptions" @end="onEnd" v-if="!isMobile()">
			<transition-group name='fade'>
				<li v-for="todo in filteredTodos" :key="todo.id" :todo-id="todo.id">
					<todo-item :todo="todo"></todo-item>
				</li>
			</transition-group>
		</draggable>
		<div v-if="isMobile()">
			<transition-group name='fade'>
				<li v-for="todo in filteredTodos" :key="todo.id" :todo-id="todo.id">
					<todo-item :todo="todo"></todo-item>
				</li>
			</transition-group>
		</div>
	</ol>
	<p v-if="filteredTodos.length < 1">There are now todos available</p>
</div>
</template>
<script>
// @ is an alias to /src
import { mapGetters, mapState, mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem';
import draggable from 'vuedraggable'
import { mixinDevice } from '@/mixins/device';

export default {
	name: 'TodoList',
	components: {
		TodoItem,
		draggable
	},
	mixins: [ mixinDevice ],
	data: function () {
		return {
			dragOptions: {
				group: { name: 'todo', pull: 'clone', put: false },
				ghostClass: "list_draggable--ghost",
				dragClass: 'list_draggable--dragging',
			}
		}
	},
	computed: {
		...mapState( {
			selectedTodoId: state => state.todos.selectedTodoId,
			todos: state => state.todos.todos,
		} ),
		filteredTodos: {
			get() {
				console.log(this.$store)
				return this.$store.getters.filteredTodos
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
		...mapActions( {
			setSelectedTodo: 'setSelectedTodo'
		} ),
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
