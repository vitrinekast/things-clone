<template>
<div class="home">
    <header>
        <h2>Log</h2>
    </header>
    <Calendar />

    <Navigation-tags />

    <Notification />

    <todo-list />

</div>
</template>

<script>
// @ is an alias to /src
//
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
    mounted: function () {
        const info = {
            title: 'mounted!',
            body: 'you mounted'
        }
        // var noti = new window.Notification(info.title, info)
        this.$store.dispatch('updateFilters', {project : false, tag: false});
    }
}
</script>
