<template>
<nav class='nav nav_fab'>
    <div class="button button--ic button--sm button--circle button--blue" @click='createTodo'>
        <i class="ic ic--md ic__add--light"></i>
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
