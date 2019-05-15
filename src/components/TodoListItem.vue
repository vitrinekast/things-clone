<template lang="html">
  <section class="card card--todo flex" v-if="todo">
  	<div class="">
  		<input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="update">
  	</div>

  	<div class="" v-if="opened">
      <form class="" action="index.html" method="post" @submit.prevent="update" @blur="update">
      	<input type="text" v-model="todo.text" name="text" value="" placeholder="This is a new todo">
        <button type="button" name="button" @click.prevent="remove">delete</button>
      	<input type="submit" class='d--none' name="" value="">
      </form>
  	</div>

  	<div class="flex flex--start" v-else @click.prevent='onClick'>
  		<div class="d--inl-block fl--left t--ellipsis--container">
  			<p class='t--ellipsis' v-if="todo.text">{{todo.text | stripTags}}</p>
  			<p class='t--ellipsis' v-else>A fresh new todo</p>
  		</div>

  		<ul class='d--inl-block fl--left'>
  			<li v-for='tag in todo.tags.slice(0, 2)' :key="tag.id" class='label label--tag label--light'>{{tag}}</li>
  		</ul>
  	</div>

  </section>
</template>

<script>
import { stripTags } from '@/helpers/utils'
import TodoItemForm from '@/components/TodoItemForm';

export default {
  components: {
    TodoItemForm
  },
  props: {
    todo: {
      required: true,
      type: Object
    },
    opened: {
      required: false,
      type: Boolean
    }
  },
  methods: {
    update () {
      this.$emit('update', {todo: this.todo})
    },
    remove () {
      this.$emit('remove', {todo: this.todo})
    },
    onClick () {
      this.$emit('toggle', {todo: this.todo})
    },
  },
  filters: {
    stripTags: function (value) {
      return stripTags(value)
    }
  },
  data() {
    return {
      isActive: false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
