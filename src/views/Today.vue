<template>
<div class="home">
    <header>
        <h2>⭐ Today</h2>
    </header>

    <Calendar />

    <Navigation-tags />

    <Notification />

    <todo-list filter-type="today" />

</div>
</template>

<script>
// @ is an alias to /src

import Calendar from '@/components/Calendar';
import Notification from '@/components/Notification';
import TodoList from '@/components/TodoList';
import NavigationTags from '@/components/Navigation/Tags';

export default {
    name: 'home',
    components: {
        Calendar,
        NavigationTags,
        Notification,
        TodoList
    }
}
</script>
