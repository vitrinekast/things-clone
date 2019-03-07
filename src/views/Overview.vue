<template>
<div class="home">
    <header class='header_page'>
        <h2 v-if="page.title">{{page.title}}</h2>
        <h2 class='flex--center--vert' v-else><i class="ic--material material-icons">folder</i><input type="text" v-model="project.title" placeholder="New Project" name="" value="" @blur="updateProject"></h2>

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
import {  mapState, mapActions } from 'vuex'

export default {
    name: 'Overview',
    components: {
        Calendar,
        NavigationTags,
        Notification,
        TodoList
    },
    computed: {
        ...mapState( {
			project: state => state.project.project
		} )
    },
    mounted: function () {
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
