<template>
<section class="card card--todo flex" v-bind:class="{ 'card--active': todo.id === selectedTodoId }">
	<div class="">
		<input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="updateTodo(todo)">
	</div>

	<div class="" v-if="todo.id === selectedTodoId">
		<todo-item-form :todo="todo"></todo-item-form>
	</div>

	<div class="flex flex--start" v-else @click='setSelectedTodo(todo.id)'>
		<div class="d--inl-block fl--left t--ellipsis--container">
			<p class='t--ellipsis' v-if="todo.text">{{todo.text}}</p>
			
		</div>

		<ul class='d--inl-block fl--left'>
			<li v-for='tag in todo.tags.slice(0, 2)' :key="tag.id" class='label label--tag label--light'>{{tag}}</li>
		</ul>
	</div>

</section>
</template>

<script>
// @ is an alias to /src
import moment from 'moment';
import { mapState, mapActions } from 'vuex'
import TodoItemForm from '@/components/TodoItemForm';

export default {
	name: 'TodoItem',

	components: {
		TodoItemForm
	},
	data() {
		return {
			editor: null
		}
	},
	filters: {
		prettyDate: function ( date ) {
			return moment( date ).calendar( null, {
				lastDay: '[Yesterday]',
				sameDay: '[Today]',
				nextDay: '[Tomorrow]',
				lastWeek: '[last] dddd',
				nextWeek: 'dddd',
				sameElse: 'L'
			} )
		},
	},
	computed: {
		...mapState( {
			selectedTodoId: state => state.todos.selectedTodoId,
		} )
	},
	props: {
		todo: {
			required: true,
			type: Object
		},
		new: {
			required: false,
			default: false,
			type: Boolean
		}
	},
	methods: {
		...mapActions( {
			updateTodo: 'updateTodo',
			setSelectedTodo: 'setSelectedTodo'
		} ),
		submit: function (todo) {
			 
			this.updateTodo(todo);
			this.setSelectedTodo(false)
		}
	}
}
</script>
