<template>
  <div class="home" v-if="todos">
    <header class='header_page'>
      <h2 >📥 Log</h2>
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
        return this.$store.getters['todos/todos']
      },
      projects() {
        return this.$store.state.projects.items
      },
    },
    data() {
      return {

      }
    },
    methods: {
      ...mapActions('todos', ['fetchAllTodos']),
      ...mapActions('projects', ['fetchAllProjects']),
    },
    created() {
      this.fetchAllProjects()
      this.fetchAllTodos()
    }
  }
</script>
