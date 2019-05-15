<template>
<div class="" v-if="project && projectTodoCount > 0">
  <h4 class='list__title flex--center--vert' v-if="project.title">
    <i class="ic--material material-icons">folder</i>
    <span v-if='project.title'>{{project.title}}</span>
    <span v-else>Untitled project</span>
  </h4>

  <TodoList :todos='projectTodos' />

</div>
</template>
<script>
import TodoList from '@/components/TodoList';


export default {
  props: ['project'],
  components: {
    TodoList
  },
  computed: {
    projectTodoCount() {
      return Object.values(this.$store.state.todos.items)
        .filter(todo => todo.project === this.project['.key']).length

    },
    projectTodos() {
      return Object.values(this.$store.state.todos.items)
        .filter(todo => todo.project === this.project['.key'])
    }
  }
}
</script>
