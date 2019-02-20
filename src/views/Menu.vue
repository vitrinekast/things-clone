<template>
    <div class="home">
  <main-navigation></main-navigation>

</div>
</template>

<script>
    // @ is an alias to /src
    //
    import MainNavigation from '@/components/NavigationMain.vue'
    // '@/components/NavigationTags';

    export default {
        name: 'home',
        components: {
            MainNavigation
        }
    }
</script>
