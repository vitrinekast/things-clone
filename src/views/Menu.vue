<template>
    <div class="home">
  <main-navigation></main-navigation>

</div>
</template>

<script>
    // @ is an alias to /src
    //
    import MainNavigation from '@/components/Navigation/Main.vue'
    // '@/components/Navigation/Tags';

    export default {
        name: 'home',
        components: {
            MainNavigation
        }
    }
</script>
