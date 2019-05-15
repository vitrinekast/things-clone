<template>
  <div class="home" v-if="project">
    <header class='header_page'>
      <h2 class='flex--center--vert'>
        <i class="ic--material material-icons">folder</i>
        <input type="text" v-model="project.title" placeholder="New Project" name="" value="" @blur="onBlur">
      </h2>
    </header>
    <TodoList :todos='todos' />
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
    props: ['projectId'],
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
          project: this.projectId
        })
      },
      project() {
        return this.$store.getters['projects/getProjectById'](this.projectId)
      },
    },
    data() {
      return {

      }
    },
    methods: {
      ...mapActions('todos', ['fetchAllTodos']),
      ...mapActions('projects', ['fetchAllProjects', 'updateProject']),
      onBlur() {
        console.log('should update the project')
        this.updateProject({item: this.project, itemId: this.project['.key']})
      }
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
