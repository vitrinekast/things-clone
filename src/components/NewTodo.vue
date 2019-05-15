<template lang="html">
  <TodoListItem :todo="newTodo" :opened='true' @update="update" @toggle="onTodoToggle"></TodoListItem>
</template>

<script>
import TodoListItem from '@/components/TodoListItem'

export default {
  data() {
    return {
      newTodo: {}
    }
  },
  components: {
    TodoListItem
  },
  methods: {
    update(payload) {
      console.log('updaet', payload)
    },
    onTodoToggle(payload) {
      console.log('onTodoToggle', payload)
    },
  }
}
</script>

<style lang="css" scoped>
</style>
