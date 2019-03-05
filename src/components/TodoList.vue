<template>
<div class="">
	<div class="" v-for="project in filteredTodosByProject">
		<router-link v-if="project.title" :to="{ name: 'project', params: { projectId: project.id }}">
			<h4 class='list__title' >{{project.title}}</h4>
		</router-link>
		<ol v-if="project.items" class='list list--todos' >
			<div class="p--fixed p--abs--100 card__backdrop" v-if='selectedTodoId' @click="setSelectedTodo(false)"></div>
			<draggable v-model="project.items" :options="dragOptions" @end="onEnd" v-if="!isMobile()">
				<transition-group name='fade'>
					<li v-for="todo in project.items" :key="todo.id" :todo-id="todo.id">
						<todo-item :todo="todo"></todo-item>
					</li>
				</transition-group>
			</draggable>
			<div v-if="isMobile()">
				<transition-group name='fade'>
					<li v-for="todo in project.items" :key="todo.id" :todo-id="todo.id">
						<todo-item :todo="todo"></todo-item>
					</li>
				</transition-group>
			</div>
		</ol>
	</div>
	<p v-if="filteredTodosByProject.length < 1">There are now todos available</p>

</div>
</template>
<script>
// @ is an alias to /src
import { mapGetters, mapState, mapActions } from 'vuex'
import TodoItem from '@/components/TodoItem';
import draggable from 'vuedraggable'
import { mixinDevice } from '@/mixins/device';
import dateFilters from '@/dateFilters';
import _ from 'underscore';
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
			projects: state => state.project.projects,
		} ),
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
			console.log(e.to)


			const projectId = e.to.getAttribute( 'project-id' );
			const dateId = e.to.getAttribute( 'date-id' );
			console.log()
			if( projectId ) {
				let todo = this.todos.find( ( todo ) => { return todo.id === e.item.getAttribute( 'todo-id' ) } );
				todo.project = e.to.getAttribute( 'project-id' );
				this.$store.dispatch( 'updateTodo', todo );
				this.$store.dispatch( 'addTodoToProject', todo );

			} else if(dateId) {
				let todo = this.todos.find( ( todo ) => { return todo.id === e.item.getAttribute( 'todo-id' ) } );
				console.log(todo)
				const filters = dateFilters(dateId)
				this.$store.dispatch( 'updateTodoWithFilters', {todo: todo, filters: filters} );
			} else {
				return false;
			}

		}
	},
}
</script>
