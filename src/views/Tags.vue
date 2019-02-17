<template>
    <div class="home">
   <header>
      <h2>#{{tag.text}}</h2>
   </header>

   <todo-list :tag='tag.text' />

</div>
</template>

<script>
    // @ is an alias to /src
    //
    import TodoList from '@/components/TodoList';
    import { mapGetters } from 'vuex'

    export default {
        name: 'home',
        components: {
            TodoList
        },
        computed: {
            // mix the getters into computed with object spread operator
            ...mapGetters([
              'tag'
            ])
        },
        mounted() {
             this.$store.dispatch('getTag',  this.$route.params.id );
        },

    }
</script>
