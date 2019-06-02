<template>
<div class="">
	<ol v-if="list" class='list list--todos'>
		<draggable v-model="list" :options="dragOptions" @end="onEnd" v-if="!isMobile()">
			<transition-group name='fade'>
				<slot></slot>
			</transition-group>
		</draggable>
		<div v-if="isMobile()">
			<transition-group name='fade'>
				<slot></slot>
			</transition-group>
		</div>
	</ol>
</div>
</template>
<script>
// @ is an alias to /src
import draggable from 'vuedraggable'
import { mixinDevice } from '@/mixins/device';

const getDateFromStringType = (string) => {
  if(string === 'inbox') {
      return false
  } else if(string === 'today') {
    return new Date()
  } else if(string === 'tomorrow') {
    return new Date().setDate( new Date().getDate()+1);
  } else if (string === 'someday') {
    return 'someday'
  }
}

export default {
	components: {
		draggable
	},
	props: [ 'list' ],
	mixins: [ mixinDevice ],
	data: function () {
		return {
			dragOptions: {
				group: { name: 'todo', pull: 'clone', put: false },
				ghostClass: "list_draggable--ghost",
				dragClass: 'list_draggable--dragging',
			}
		}
	},
	computed: {
		// ...mapState( {
		// 	selectedTodoId: state => state.todos.selectedTodoId,
		// 	todos: state => state.todos.todos,
		// 	projects: state => state.project.projects,
		// 	filters: state => state.todos.filters,
		// } ),
		// list: {
		// 	get() {
		// 		return this.value
		// 	},
		// 	set( value ) {
		// 		let array = [];
		// 		value.forEach( ( val, index ) => {
		// 			val.order = index;
		// 			array.push( { order: index, id: val.id } )
		// 		} )
		// 		this.$store.dispatch( 'updateAllTodos', {
		// 			changes: array,
		// 			allData: value
		// 		} );
		// 	}
		// }
	},
	methods: {
		// ...mapActions( {
		// 	setSelectedTodo: 'setSelectedTodo'
		// } ),

		onEnd: function ( e ) {
      let todo = this.list.find(item => item.id === e.item.id)
      const projectId = e.to.getAttribute('project-id');
			
      if(projectId) {
        todo.project = projectId
      } else {
        todo.deadline = getDateFromStringType(e.to.getAttribute( 'date' ))
      }
      this.$emit('update', {todo, projectId})
		}
	},
}
</script>
