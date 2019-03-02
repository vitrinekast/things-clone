<template>
<div class="">
	<input class='fn-choices' :id="todo.id" type="text" v-bind:value="tagsToString(todo.tags)" placeholder="Add a new tag">
</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import Choices from 'choices.js'
import { mapActions } from 'vuex'

export default {
	name: 'TodoItemTag',
	props: [
		'todo'
	],

	mounted: function () {
		const selector = '.fn-choices#' + this.todo.id
		const options = {
			delimiter: ',',
			maxItemCount: -1,
			duplicateItemsAllowed: false
		}

		const textRemove = new Choices( document.querySelector(selector), options );

		textRemove.passedElement.element.addEventListener( 'addItem', ( e ) => {
			console.log('add?',this)
			this.todo.tags.push( e.detail.value );
			this.updateTodo(this.todo)
		} );
		textRemove.passedElement.element.addEventListener( 'removeItem', ( e ) => {
			this.todo.tags = this.todo.tags.filter(function(value){
				return value.text  === e.detail.value
			});
			this.updateTodo(this.todo)
		} );

	},
	computed: {
		...mapState( {
			tags: state => state.tags.tags
		})
	},
	methods: {
		tagsToString: function (tags) {
			return tags.toString()
		},
		...mapActions( {
			updateTodo: 'updateTodo'
		} ),
	}
}
</script>
