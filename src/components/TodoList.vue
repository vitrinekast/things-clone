<template>
<div class="">

	<ol v-if="todos" class='list list--todos'>
		<div class="p--fixed p--abs--100 card__backdrop" v-if='selectedTodoId' @click="setSelectedTodo(false)"></div>

		<li v-for="todo in todos" :key="todo.id">

			<div class="card card--todo flex card--active" v-if='todo.id === selectedTodoId'>
                <div class="">
            		<input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="updateTodo(todo)">
            	</div>
                <div class="" >
                    <form class="" action="index.html" method="post" @submit.prevent="updateTodo(todo)">
                        <input type="text" v-model="todo.text" name="text" value="" placeholder="This is a new todo">
                        <textarea name="notes" v-model="todo.notes" placeholder="notes..."></textarea>
                        <todo-item-tag :todo="todo"></todo-item-tag>
                    </form>
                </div>
			</div>
			<section class="card card--todo flex" v-else>
                <div class="">
            		<input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="updateTodo(todo)">
            	</div>
                <div class="" @click='setSelectedTodo(todo.id)'>
                    <div class="d--inl-block fl--left">
                        <p class='t--ellipsis' v-if="todo.text">{{todo.text}}</p>
                    </div>

                    <ul class='d--inl-block fl--left'>
                        <li v-for='tag in todo.tags' :key="tag.id" class='label label--tag label--light'>{{tag}}</li>
                    </ul>
                </div>
			</section>
		</li>


	</ol>

	<p v-if="todos.length < 1">There are now todos available</p>
</div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapState, mapActions } from 'vuex'
import TodoItemTag from '@/components/TodoItemTag';

export default {
	name: 'TodoList',
    filters : {
        getPrettyDate: function ( date ) {
			return moment( date ).calendar( null, {
				lastDay: '[Yesterday]',
				sameDay: '[Today]',
				nextDay: '[Tomorrow]',
				lastWeek: '[last] dddd',
				nextWeek: 'dddd',
				sameElse: 'L'
			} )
		},
        stringify: function (array) {
            return array.toString();
        }
    },
    components: {
        TodoItemTag
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
        stringTags: function (todo) {
            return todo.tags.toString();
        },
		...mapActions( {
			updateTodo: 'updateTodo',
			setSelectedTodo: 'setSelectedTodo'
		} )
	},
}
</script>
