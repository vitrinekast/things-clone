<template>
  <div class="home" v-if="todos">
    <header class='header_page'>
      <h2 >⭐️ Someday</h2>
    </header>

    <ProjectList :todos='todos' />
  </div>
</template>

<script>
  // @ is an alias to /src

  // import Calendar from '@/components/Calendar';
  // import Notification from '@/components/Notification';
  import TodoList from '@/components/TodoList';
  import ProjectList from '@/components/ProjectList';
  // import NavigationTags from '@/components/NavigationTags';
  import {
    mapActions
  } from 'vuex'
  // import dateFilters from '@/dateFilters';

  export default {
    components: {
      // Calendar,
      // NavigationTags,
      // Notification,
      TodoList,
      ProjectList
    },
    computed: {
      todos() {
        return this.$store.getters['todos/filteredTodos']({
          date: 'someday'
        })
      },
      projects() {
        let ids = this.todos.map(todo => todo.project);
        return this.$store.getters['projects/projectsWithTodoIds'](ids)
      },
    },
    data() {
      return {

      }
    },
    methods: {
      ...mapActions('todos', ['fetchAllTodos']),
      ...mapActions('projects', ['fetchAllProjects'])
    },
    created() {
      this.fetchAllProjects()
      this.fetchAllTodos()
        // .then((projects) => {
        //   return Promise.all(projects.docs.map((project) => {
        //     this.fetchTodosByDate({date: new Date(), projectId: project.id })
        //   }))
        // })
    }
  }
</script>
