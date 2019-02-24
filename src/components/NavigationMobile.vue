<template>
<div class="">
    <nav class='flex nav--mobile'>
        <div class="button button--sm button--black" @click='toggleMenu'>
            menu
        </div>
        {{menuOpen}}
        <div class="button button--sm button--black">
            settings
        </div>

    </nav>
    <main-navigation :menuOpen='menuOpen'></main-navigation>
</div>
</template>

<script>

import MainNavigation from '@/components/NavigationMain.vue'

export default {
    name: 'MobileNavigation',
    computed: {

    },
    data: function () {
        return {
            menuOpen: false
        }
    },
    components: {
        MainNavigation
    },
    methods: {
        toggleMenu: function() {
            this.menuOpen = !this.menuOpen;
        }
    }
}
</script>
