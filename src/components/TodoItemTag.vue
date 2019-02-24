<template>
<div class="">
	<ul v-if="!isInActiveItem && todo">
		<li v-for='(tag, index) in todo.tags' :key="index" class='label label--tag label--light' v-bind:class="{ 'label--green': isInActiveItem }">{{tag}}</li>
	</ul>

	<input v-if="isInActiveItem" id="choices-text-remove-button" type="text" v-bind:value="todoTagsChoiceValue" placeholder="Add a new tag">
</div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
import Choices from 'choices.js'
export default {
	name: 'TodoItemTag',
	props: [
		'todo', 'isInActiveItem'
	],
	data: function () {
		return {
			newTag: '',
			autocomplete: []
		}
	},
	mounted: function () {

		if( !this.isInActiveItem ) {
			return false
		}
		var textRemove = new Choices( document.getElementById( 'choices-text-remove-button' ), {
			delimiter: ',',
			maxItemCount: -1,
			duplicateItemsAllowed: false
		} );

		textRemove.passedElement.element.addEventListener( 'addItem', ( e ) => {
			this.todo.tags.push( e.detail.value );
			this.updateTags()
		}, );
		textRemove.passedElement.element.addEventListener( 'removeItem', ( e ) => {
			this.todo.tags = this.todo.tags.filter(function(value){
				return value.text  === e.detail.value
			});
			this.updateTags()
		} );

	},
	computed: {
		...mapGetters( [
			'tags'
		] ),

		todoTagsChoiceValue: function () {
			let string = this.todo.tags.toString();
			return string
		}
	},
	methods: {
		updateTags: function () {
			this.$store.dispatch( 'updateTodo', this.todo );
		},
	}
}
</script>
