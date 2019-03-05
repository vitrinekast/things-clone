<template>
<div class="">
    <ol v-if="list" class='list list--todos'>
        <draggable v-model="list" :options="dragOptions" @end="onEnd" v-if="!isMobile()">
            <transition-group name='fade'>
                <li v-for="todo in list" :key="todo.id" :todo-id="todo.id">
                    <todo-item :todo="todo"></todo-item>
                </li>
            </transition-group>
        </draggable>
        <div v-if="isMobile()">
            <transition-group name='fade'>
                <li v-for="todo in list" :key="todo.id" :todo-id="todo.id">
                    <todo-item :todo="todo"></todo-item>
                </li>
            </transition-group>
        </div>
    </ol>
</div>
</template>
<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem';
import draggable from 'vuedraggable'
import { mixinDevice } from '@/mixins/device';
import dateFilters from '@/dateFilters';
import _ from 'underscore';
export default {
	name: 'TodoListList',
	components: {
		TodoItem,
		draggable
	},
	props: [ 'list' ],
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
			projects: state => state.project.projects,
			filters: state => state.todos.filters,
		} ),
		todos: {
			get() {
				if( this.grouped ) {
					return this.$store.getters.filteredTodosByProject
				} else {
					return this.$store.getters.filteredTodos
				}
			},
			set( value ) {

			}
		},
		filteredTodosByProject: {
			get() {
				return this.$store.getters.filteredTodosByProject
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
			const dateId = e.to.getAttribute( 'date-id' );

			if( projectId ) {
				let todo = this.todos.find( ( todo ) => { return todo.id === e.item.getAttribute( 'todo-id' ) } );
				todo.project = e.to.getAttribute( 'project-id' );
				this.$store.dispatch( 'updateTodo', todo );
				this.$store.dispatch( 'addTodoToProject', todo );

			} else if( dateId ) {
				let todo = this.todos.find( ( todo ) => { return todo.id === e.item.getAttribute( 'todo-id' ) } );

				const filters = dateFilters( dateId )
				this.$store.dispatch( 'updateTodoWithFilters', { todo: todo, filters: filters } );
			} else {
				return false;
			}

		}
	},
}
</script>
