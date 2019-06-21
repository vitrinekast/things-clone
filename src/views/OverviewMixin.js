import TodoListByProject from '@/components/TodoListByProject'
import TodoListItem from '@/components/TodoListItem';
import TodoList from '@/components/TodoList';
import NavigationTags from '@/components/NavigationTags';
import { mapActions } from 'vuex'
import { groupBy } from 'underscore'


const initialState = () => {
    return {
        newTodo: {
            created: new Date(),
            userId: '2WpuEc3jqYdnJXZbb5RjyPUa5AI2',
            text: '',
            tags: [],
            project: false,
            deadline: false,
            done: false,
            notes: ''
        }
    }
}


export default {
    components: {
        TodoListItem,
        NavigationTags,
        TodoListByProject,
        TodoList
    },
    computed: {
        projects() {
            return this.$store.getters['projects/projects']
        },
        filteredTodos() {
            return this.$store.getters['todos/filteredTodos'](this.filters)
        },
        todos() {
            return this.$store.getters['todos/todos']
        },
        tags() {
            return this.$store.getters['tags/tags']
        },
        todosByProject() {
            return groupBy(this.filteredTodos, 'project');
        }

    },

    data() {
        return initialState()

    },
    methods: {
        ...mapActions('todos', ['fetchTodos', 'fetchAllTodos', 'createTodo']),
        ...mapActions('projects', ['fetchProjects', 'fetchAllProjects']),
        ...mapActions('tags', ['fetchTags', 'fetchAllTags']),
        ...mapActions('filters', ['updateFilters']),

        updateNewTodo(payload) {
            debugger
            this.createTodo({ item: payload.todo }).then(() => {
                Object.assign(this.$data, initialState());
            })

        },
        projectById(id) {

            return this.projects.find(x => x.id === id);

        },
        filterTodos(payload) {
          
            this.filters = {
                ...this.filters,
                tag: payload['tag']
            };
            this.$data.newTodo.today = this.filters.today
            this.$data.newTodo.tags = [this.filters.tag]
            this.$data.newTodo.done = this.filters.done

        },
        clearFilter(payload) {
            Object.keys(payload).forEach(item => delete this.filters[item])
            this.fetchTodos(this.filters)
        },
    },
    created() {
        this.newTodo.project = this.projectId ? this.projectId : false
        this.fetchAllTodos();
        this.fetchAllTags();
        this.fetchAllProjects();
    }
}
