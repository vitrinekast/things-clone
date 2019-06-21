<template>
<form class="" action="index.html" method="post" @submit.prevent="submit(todo)" @change="updateTodo(todo)">
	<input type="text" v-model="todo.text" name="text" value="" placeholder="This is a new todo">
	<input type="submit" class='d--none' name="" value="">
</form>
</template>
<script>
// @ is an alias to /src
import { mapState, mapActions } from 'vuex'
export default {
	name: 'TodoItemForm',

	props: [ 'todo' ],
	data() {
		return {
			editor: null
		}
	},

	mounted() {
		this.editor = new Editor( {
			content: this.todo.notes,
			editable: this.editable,
			extensions: [
				new BulletList(),
				new HardBreak(),
				new Heading( { levels: [ 1, 2, 3 ] } ),
				new ListItem(),
				new OrderedList(),
				new Bold(),
				new Italic(),
				new Link(),
				new Strike(),
				new Underline(),
				new History(),
				new Placeholder( {
					emptyClass: 'is-empty',
					emptyNodeText: 'Write something …'
				} ),
			],
			placeholder: 'Some notes',
			onUpdate: ( { getHTML } ) => {
				this.todo.notes = getHTML()
			},
		} )
	},
	beforeDestroy() {
		this.editor.destroy()
	},
	watch: {
		placeholder( newValue ) {
			this.editor.extensions.options.placeholder.emptyNodeText = newValue
		},
	},
	computed: {
		...mapState( {
			selectedTodoId: state => state.todos.selectedTodoId,
		} )
	},

	methods: {
		...mapActions( {
			updateTodo: 'updateTodo',
			setSelectedTodo: 'setSelectedTodo'
		} ),
		setEditable: function () {
			this.editor.setOptions( {
				editable: true,
			} )
		},
		submit: function ( todo ) {
			 
			this.updateTodo( todo );
			
			this.setSelectedTodo( false )
		}
	}
}
</script>
