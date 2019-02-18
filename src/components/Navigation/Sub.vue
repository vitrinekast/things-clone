<template>
<nav class='nav nav--sub flex--center'>
    <div class="button button--sm" @click="createTodo">
        +
    </div>
</nav>
</template>

<script>
export default {
    name: 'MainNavigation',
    methods: {
        createTodo: function() {
            this.$store.dispatch('createTodo');
        }
    }
}
</script>
