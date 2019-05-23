<template lang="html">
  <section class="card card--todo flex" v-if="todo" :class="{'card--active': opened}">
    <div class="">
      <input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="update">
    </div>
    
    <div class="op" v-if="opened">
      <form class="" action="index.html" method="post" @submit.prevent="update" @blur="update">
        <input type="text" v-model="todo.text" name="text" value="" placeholder="A fresh new todo">
        <TodoItemNotes :note='todo.note' @update='update' v-if="!newItem" />
        <a href="#" class='button button--red button--sm button--clear' @click.prevent="remove" v-if="!newItem">
          <span class='flex--center--vert'>
            <i class="ic--material material-icons">delete</i>Delete</span>
        </a>
        <input type="submit" class='d--none' name="" value="">
      </form>
    </div>

    <div class="flex flex--start" v-else @click.prevent='onClick'>
      <div class="d--inl-block fl--left t--ellipsis--container">
        <p class='t--ellipsis' v-if="todo.text">{{todo.text | stripTags}}</p>
        <p class='t--ellipsis' v-else>A fresh new todo</p>
      </div>

      <ul class='d--inl-block fl--left' v-if="todo.tags">
        <li v-for='tag in todo.tags.slice(0, 2)' :key="tag.id" class='label label--tag label--light'>{{tag}}</li>
      </ul>
    </div>

  </section>
</template>

<script>
import { stripTags } from '@/helpers'
import TodoItemNotes from '@/components/TodoItemNotes'
import moment from 'moment'

export default {
  components: {
    TodoItemNotes
  },
	props: {
		todo: {
			required: true,
			type: Object
		},
		opened: {
			required: false,
			type: Boolean
		},
		newItem: {
			required: false,
			type: Boolean,
      defaut: false
		}
	},
	methods: {
		update(payload) {
      let todo = this.todo
      if(payload) {
        this.todo.note = payload.note
      }
			this.$emit( 'update', { todo: todo } )
		},
		remove() {
			this.$emit( 'remove', { todo: this.todo } )
		},
		onClick() {
			this.$emit( 'toggle', { todo: this.todo } )
		}
	},
	filters: {
		stripTags: function ( value ) {
			return stripTags( value )
		},
    prettyDate: function ( value ) {
      return moment.unix(value).format("MMM DD YY");  
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
