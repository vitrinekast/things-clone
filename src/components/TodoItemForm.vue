<template>
<form class="" @submit.prevent="update" v-if="isActive()">
	<input type="text" v-model="todo.text" name="" value="" placeholder="This is a new todo">
	<textarea name="notes" v-model="todo.notes" placeholder="notes..."></textarea>

	<todo-item-tag :todo="todo" v-if="isActive()" :isInActiveItem="true"></todo-item-tag>

	<p class="" v-if='todo.planned'>{{todo.planned | getPrettyDate}}</p>
</form>
</template>

<script>
// @ is an alias to /src
import TodoItemTag from '@/components/TodoItemTag';
import { TodoMixin } from '@/common/todo.service'
export default {
	name: 'TodoItemForm',
	props: [
		'todo'
	],
	mixins: [ TodoMixin ],
	components: {
		TodoItemTag,
	}
}
</script>
