<template>
	<section class="card card--todo flex" v-bind:class="{ 'card--active': todo.id === selectedTodoId }">

		<div class="">
			<input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="updateTodo(todo)">
		</div>



		<div class="" v-if="todo.id === selectedTodoId" >
			<form class="" action="index.html" method="post" @submit.prevent="updateTodo(todo)">
				<input type="text" v-model="todo.text" name="text" value="" placeholder="This is a new todo">
				<textarea name="notes" v-model="todo.notes" placeholder="notes..."></textarea>
				<todo-item-tag :todo="todo"></todo-item-tag>
				<input type="date" v-model='todo.planend' name="" value="">
			</form>
		</div>

		<div class="flex flex--start" v-else @click='setSelectedTodo(todo.id)'>
			<div class="d--inl-block fl--left t--ellipsis--container">
				<p class='t--ellipsis' v-if="todo.text">{{todo.text}}</p>
				<p class='t--ellipsis' v-else>A fresh new todo</p>
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
import TodoItemTag from '@/components/TodoItemTag';

export default {
	name: 'TodoItem',

    components: {
        TodoItemTag
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
	props: ['todo'],
	methods: {
		...mapActions( {
			updateTodo: 'updateTodo',
			setSelectedTodo: 'setSelectedTodo'
		} )
	}
}
</script>
