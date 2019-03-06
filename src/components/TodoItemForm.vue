<template>
<form class="" action="index.html" method="post" @submit.prevent="submit(todo)" @change="updateTodo(todo)">
	<input type="text" v-model="todo.text" name="text" value="" placeholder="This is a new todo">
	<div @dblclick="setEditable"><editor-content :editor="editor" /></div>
	<div class="flex">
		<div class="col col--8 flex--center--vert">
			<todo-item-tag :todo="todo"></todo-item-tag>
		</div>
		<div class="col col--4 t--right">
			<input type="date" v-model='todo.planend' name="" value="">
		</div>
	</div>
	<input type="submit" class='d--none' name="" value="">
</form>

</template>
<script>
// @ is an alias to /src
import moment from 'moment';
import { mapState, mapActions } from 'vuex'
import TodoItemTag from '@/components/TodoItemTag';
import { Editor, EditorContent } from 'tiptap'
import {
	Blockquote,
	CodeBlock,
	HardBreak,
	Heading,
	HorizontalRule,
	OrderedList,
	BulletList,
	ListItem,
	TodoItem,
	TodoList,
	Placeholder,
	Bold,
	Code,
	Italic,
	Link,
	Strike,
	Underline,
	History,
} from 'tiptap-extensions'
export default {
	name: 'TodoItemForm',
	components: {
		EditorContent,
		TodoItemTag
	},
	props: [ 'todo' ],
	data() {
		return {
			editor: null,
			editable: false
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
			onUpdate: ( { getJSON, getHTML } ) => {
				this.todo.notes = getHTML()
			},
		} )
		console.log(this.editor)
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
	props: [ 'todo' ],
	methods: {
		...mapActions( {
			updateTodo: 'updateTodo',
			setSelectedTodo: 'setSelectedTodo'
		} ),
		setEditable: function () {
			this.editor.setOptions({
	        editable: true,
	      })
	  },
		submit: function ( todo ) {
			console.log( "updating", todo )
			this.updateTodo( todo );
			this.setSelectedTodo( false )
		}
	}
}
</script>
