<template>
<div class="card card--todo flex" v-bind:class="{ 'card--active': isActive() }" @click="setActiveTodo">

	<div class="col">
		<input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="update">
	</div>
	<div class="col col--12" v-if="isActive()">
		<todo-item-form :todo="todo"></todo-item-form>
	</div>

	<div class="col col--12" v-else>
		<div class="fl--left">
			<p class='t--ellipsis' v-if="todo.text">{{todo.text}}</p>
			<p v-else class='t--grey'>This is a new todo</p>
		</div>
		<div v-if="todo.notes.length > 0" class="button btn--ic fl--left">
			<i class="ic ic--sm ic__attatchment"></i>
		</div>

		<todo-item-tag :todo="todo" v-if="!isActive()" :isInActiveItem="false" class='fl--left'></todo-item-tag>

	</div>

	<todo-item-nav v-if="isActive()" :projectMenu="projectMenu"></todo-item-nav>
</div>
</template>
<script>
// @ is an alias to /src
import TodoItemTag from '@/components/TodoItemTag';
import TodoItemNav from '@/components/TodoItemNav';
import TodoItemForm from '@/components/TodoItemForm';

import { TodoMixin } from '@/common/todo.service'

import { mapGetters } from 'vuex'

export default {
	name: 'TodoItem',
	props: [
		'todo', 'active'
	],
	mixins: [TodoMixin],
	components: {
		TodoItemTag,
		TodoItemForm,
		TodoItemNav
	},
	data: function () {
		return {
			projectMenu: false
		}
	},
	computed: {
		...mapGetters( [
			'activeTodoId',
			'projects'
		] )
	},

	methods: {
		onKeyUp: function ( e ) {
			this.todo.text = e.target.innerText;
		},

	}
}
</script>
