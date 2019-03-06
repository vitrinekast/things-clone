<template>
	<div class="">
		<div class="p--fixed p--abs--100 card__backdrop" v-if='selectedTodoId' @click="setSelectedTodo(false)"></div>
		<div class="" v-if="grouped">
			<div class="" v-if="todos.find(todo => todo.title === false)">
				<todo-list-list v-bind:list="todos.find(todo => todo.title === false).items"></todo-list-list>
			</div>

			<div class="" v-for="project in todos.filter(todo => todo.title !== false)">
				<router-link v-if="project.title" :to="{ name: 'project', params: { projectId: project.id }}">
					<h4 class='list__title'>{{project.title}}</h4>
				</router-link>

				<todo-list-list v-bind:list="project.items"></todo-list-list>

			</div>
		</div>
		<div class="" v-else="v-else">

			<todo-list-list v-bind:list="todos"></todo-list-list>

		</div>
		<p v-if="todos.length < 1">There are now todos available</p>

	</div>
</template>
<script>
	// @ is an alias to /src
	import {mapState, mapActions} from 'vuex'
	import TodoListList from '@/components/TodoListList';
	import dateFilters from '@/dateFilters';
	import _ from 'underscore';
	export default {
		name: 'TodoList',
		components: {
			TodoListList
		},
		props: ['grouped'],
		computed: {
			...mapState({
				selectedTodoId: state => state.todos.selectedTodoId,
				todos: state => state.todos.todos,
				projects: state => state.project.projects,
				filters: state => state.todos.filters
			}),
			todos: {
				get() {
					if (this.grouped) {
						return this.$store.getters.filteredTodosByProject
					} else {
						return this.$store.getters.filteredTodos
					}
				},
				set(value) {
					let array = [];
					value.forEach((val, index) => {
						val.order = index;
						array.push({order: index, id: val.id})
					})
					this.$store.dispatch('updateAllTodos', {
						changes: array,
						allData: value
					});
				}
			}
		},
		methods: {
			...mapActions({setSelectedTodo: 'setSelectedTodo'}),
			onEnd: function (e) {


			}
		}
	}
</script>
