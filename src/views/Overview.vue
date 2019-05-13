<template>
<div class="home">
    <header class='header_page'>

        <h2 class='flex--center--vert' v-if="currentProject"><i class="ic--material material-icons">folder</i><input type="text" v-model="currentProject.title" placeholder="New Project" name="" value="" @blur="updateProject"></h2>
        <h2 v-else>{{page.title}}</h2>

    </header>

    <Calendar />

    <Navigation-tags />

    <Notification />

    <todo-list  v-bind:grouped="page.grouped" />

</div>
</template>

<script>
// @ is an alias to /src

import Calendar from '@/components/Calendar';
import Notification from '@/components/Notification';
import TodoList from '@/components/TodoList';
import NavigationTags from '@/components/NavigationTags';
import { mapActions, mapGetters } from 'vuex'
import dateFilters from '@/dateFilters';

export default {
    name: 'Overview',
    components: {
        Calendar,
        NavigationTags,
        Notification,
        TodoList
    },
    props: ['projectId'],
    computed: {

        currentProject() {
          if(this.$route.params.projectId) {
            return this.projects.find(project => project.id === this.$route.params.projectId)
          }
          else {
            return false
          }
        },
        ...mapGetters( [
          'projects'
        ]),
    },
    mounted: function () {
console.log('update base')
      if(this.$route.params.projectId) {
        console.log('update base')
        this.page.baseFilters =  dateFilters('Project', this.$route.params.projectId)
      }
        this.updateFilters(this.page.baseFilters)
    },
    data() {
        return {
            page: this.$route.meta
        }
    },
    methods: {
		...mapActions( {
			'updateFilters': 'updateFilters',
			'updateProject': 'updateProject',
			'setProject': 'setProject'
		} )
	}
}
</script>
