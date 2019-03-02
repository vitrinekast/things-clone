<template>
<div class="home">
    <header>
        <h2>📥 Inboxie</h2>
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
import dateFilters from '@/dateFilters';

export default {
    name: 'home',
    components: {
        Calendar,
        NavigationTags,
        Notification,
        TodoList
    },
    mounted: function () {
        this.updateFilters(dateFilters('Inbox'))
    },
    methods: {
		...mapActions( {
			'updateFilters': 'updateFilters'
		} )
	}
}
</script>
