<template>
<nav class='nav nav--sub flex--center'>
    <div class="button button--sm" @click="createTodo">
        +
    </div>
    <div class="button button--sm" @click="deleteAllTodos">
        delete all todos
    </div>
</nav>
</template>

<script>
export default {
    name: 'MainNavigation',
    methods: {
        createTodo: function () {
            this.$store.dispatch('createTodo');
        },
        deleteAllTodos: function () {
            this.$store.dispatch('deleteAllTodos');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
