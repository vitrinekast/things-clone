<template>
<nav class='nav nav_fab'>
    <div class="col button button--black button--sm" @click="createTodo">
        + new todo
    </div>
</nav>
</template>

<script>

export default {
    name: 'FabNavigation',
    methods: {
        createTodo: function() {
            this.$store.dispatch('createTodo');
        }
    }
}
</script>
