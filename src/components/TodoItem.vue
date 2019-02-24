<template>
<div class="card card--todo flex" v-bind:class="{ 'card--active': isActive(todo.id) }" @click="setActiveTodo">
	<div class="col">
		<input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="submit">
	</div>
	<div class="col col--12" v-if="isActive(todo.id)">
		<form class="" @submit.prevent="submit" v-if="isActive(todo.id)">
			<input type="text" v-model="todo.text" name="" value="" placeholder="This is a new todo">
			<textarea name="notes" v-model="todo.notes" placeholder="notes..."></textarea>
			<todo-item-tag :todo="todo" v-if="isActive(todo.id)" :isInActiveItem="true"></todo-item-tag>
			<div class="" v-if='todo.planned'>
				{{todo.planned | getPrettyDate}}
			</div>
		</form>
	</div>
	<div class="col col--12" v-else>
		<div class="fl--left">
			<p class='t--ellipsis' v-if="todo.text">{{todo.text}}</p>
			<p v-else class='t--grey'>This is a new todo</p>
		</div>
		<div v-if="todo.notes.length > 0" class="button btn--ic fl--left">
			<i class="ic ic--sm ic__attatchment"></i>
		</div>
		<todo-item-tag :todo="todo" v-if="!isActive(todo.id)" :isInActiveItem="false" class='fl--left'></todo-item-tag>
	</div>
	<nav class='nav nav_todo flex flex--center' v-if="isActive(todo.id)">
		<div class="col col--3 button button--blue button--ic button--sm" @click="projectMenu = !projectMenu">
			<span>Move</span> <i class="ic ic--sm ic__arrow--next"></i>
		</div>
		<div class="col col--3 button button--blue button--sm" @click="remove">
			Delete
		</div>
	</nav>
	<nav class='nav nav_todo_projects flex' v-if="isActive(todo.id) && projectMenu">
		<h3 class='t--center col'>Move</h3>
		<div class="p--abs" @click='projectMenu = false'>
			close
		</div>
		<ul class='col col--12'>
			<li v-for="project in projects" :key="project.id" class="button button--white button--sm" @click="addToProject(project.id)">
				{{project.title}}
			</li>
		</ul>
	</nav>
</div>
</template>
<script>
// @ is an alias to /src
import TodoItemTag from '@/components/TodoItemTag';
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
	name: 'TodoItem',
	props: [
		'todo', 'active'
	],
	components: {
		TodoItemTag
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
	filters: {
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
	},
	methods: {
		addToProject: function ( id ) {
			this.projectMenu = false;
			this.todo.project = id;
			// this.$store.dispatch( 'updateTodo', {this.todo} );
			this.$store.dispatch({
			  type: 'updateTodo',
			  payload: this.todo
			})
			this.$store.dispatch( 'addTodoToProject', this.todo );
		},
		remove: function () {
			if( window.confirm( "Do you really want to delete this todo?" ) ) {
				this.$store.dispatch( 'deleteTodo', this.todo );
			}
		},
		submit: function () {
			this.$store.dispatch( 'updateTodo', this.todo );
		},
		onKeyUp: function ( e ) {
			this.todo.text = e.target.innerText;
		},
		isActive: function ( id ) {
			return id === this.activeTodoId
		},
		setActiveTodo: function () {
			this.$store.dispatch( 'setActiveTodo', this.todo );
		}
	}
}
</script>
