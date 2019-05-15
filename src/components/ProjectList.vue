<template>
	<div class="" v-if="todoProjects">

		<ul v-if="todoProjects.length > 0">

			<li v-for="project in todoProjects" :key="project['.key']">

				<h4 class='list__title flex--center--vert' v-if="project.title">
					<i class="ic--material material-icons">folder</i>
					<span v-if='project.title'>{{project.title}}</span>
					<span v-else="v-else">Untitled project</span>
				</h4>
				<TodoList :todos="todos.filter(todo => todo.project == project['.key'])"/>

			</li>

		</ul>

		<p v-else>There are now projects available</p>
	</div>
</template>
<script>

	import ProjectListItem from '@/components/ProjectListItem';
	import TodoList from '@/components/TodoList';

	export default {
		props: ['todos'],
		components: {
			ProjectListItem,
			TodoList
		},
		computed: {
			projectTodos(projectId) {
				console.log("a");
				console.log({projectId})
			},
			todoProjects() {
				console.log(this.todos)
				if (this.todos) {
					let ids = this.todos.map(todo => todo.project);
					return this.$store.getters['projects/projectsWithTodoIds'](ids)
				}
			},
			projectItemCount() {
				console.log(this.todoProjects, 'count')
				return this.todoProjects
					? Object.keys(this.todoProjects).length
					: 0
			}
		}
	}
</script>