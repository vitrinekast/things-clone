<template>
<div class="home">
    <header>
        <h2><input type="text" v-model="project.title" placeholder="New Project" name="" value="" @blur="updateProject"></h2>

    </header>
    <Calendar />

    <Navigation-tags />

    <Notification />

    <todo-list filter-type="unnassigned" />

</div>
</template>

<script>
// @ is an alias to /src

import Calendar from '@/components/Calendar';
import Notification from '@/components/Notification';
import TodoList from '@/components/TodoList';
import NavigationTags from '@/components/NavigationTags';
import { mapGetters } from 'vuex'

export default {
    name: 'home',
    components: {
        Calendar,
        NavigationTags,
        Notification,
        TodoList
    },
    computed: {
        ...mapGetters( [
			'projects'
		] ),
        project: {
            get() {
                return this.projects.find((project) => {
                    return project.id === this.$route.params.projectId;
                })
            },
            set() {
                this.$store.dispatch( 'updateProject', this.project );
            }
        }
    },
    mounted: function () {
        this.$store.dispatch('updateFilters', {
            project: this.project.id
        });
	},
	methods: {
		updateProject() {
			this.$store.dispatch( 'updateProject', this.project );
		},
	}
}
</script>
