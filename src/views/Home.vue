<template>
<div class="home">
    <header>
        <h2>All todos</h2>
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
