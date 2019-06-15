<template lang="html">
  <div class="">

    <ul v-if="todos">
      <li v-for='(todoGroup, index) in todos' :key='index'>

        <h4 class='list__title flex--center--vert' v-if="projectById(index)">
          <i class="ic--material material-icons">folder</i>
          <span v-if='projectById(index).text'>{{projectById(index).text}}</span>
          <span v-else>Untitled project</span>
        </h4>

        <TodoList :todos="todoGroup"/>

      </li>
    </ul>
    <p v-else>There are no items available</p>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList';

export default {
	props: [ 'todos' ],
	components: {
		TodoList
	},
	computed: {
		projects() {
			return this.$store.getters[ 'projects/projects' ]
		}
	},
	methods: {

		projectById( id ) {
			return this.projects.find( project => project.id === id );
		},
	}

}
</script>

<style lang="css" scoped>
</style>
