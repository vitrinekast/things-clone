import TodoListItem from '@/components/TodoListItem';
import ProjectList from '@/components/ProjectList';
import NavigationTags from '@/components/NavigationTags';
import { mapActions } from 'vuex'

export default {
	components: {
		TodoListItem,
		ProjectList,
		NavigationTags
	},
	computed: {
		projects() {
			return this.$store.getters[ 'projects/projectsWithTodoIds' ]( this.todos.map( todo => todo.project ) )
		},
		todos() {
			return this.$store.getters[ 'todos/todos' ]
		},
		tags() {
			return this.$store.getters[ 'tags/tags' ]
		}
	},
	data() {
		return {
			newTodo: {
				deadline: new Date(),
				text: '',
				tags: [],
				notes: ''
			}
		}
	},
	methods: {
		...mapActions( 'todos', [ 'fetchTodos', 'createTodo' ] ),
		...mapActions( 'projects', [ 'fetchAllProjects' ] ),
		...mapActions( 'tags', [ 'fetchTags' ] ),
    
		updateNewTodo( payload ) {
			this.createTodo( { item: payload.todo } )
      this.newTodo.text = ''
		},
		filterTodos (payload) {
			Object.keys(payload).forEach(item => this.filters[item] = payload[item])
			this.fetchTodos(this.filters)
		},
		clearFilter (payload) {
			Object.keys(payload).forEach(item => delete this.filters[item])
			this.fetchTodos(this.filters)
		},
	},
	created() {
		this.fetchAllProjects()
		this.fetchTodos(this.filters).then(() => {
			this.fetchTags(this.todos.map(a => a.id))
		})
	}
}