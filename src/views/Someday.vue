<template>
<div class="home">
    <header>
        <h2>⭐️ Someday</h2>
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
import { mapState, mapActions } from 'vuex'

export default {
    name: 'home',
    components: {
        Calendar,
        NavigationTags,
        Notification,
        TodoList
    },
    mounted: function () {
        this.updateFilters({
            noProject: false,
            noDate: false,
            date: 'someday',
            project: false,
            tag: false,
         })
    },
    methods: {
		...mapActions( {
			'updateFilters': 'updateFilters'
		} )
	}
}
</script>
