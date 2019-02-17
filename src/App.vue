<template>
<div id="app" class='flex flex--start d--block--sm'>
    <div class="col--2--lg col--3--md" v-if="!isMobile()" >
        <main-navigation></main-navigation>
    </div>
    <div class="" v-if="isMobile()">
        <mobile-navigation></mobile-navigation>
    </div>
    <main class='col--9--lg col--9--md col--12--sm'>
        <div class="container">
            <router-view />
        </div>
    </main>
    <sub-navigation></sub-navigation>
</div>
</template>

<script>
// @ is an alias to /src

import { mixinDevice } from '@/mixins/device';

import MainNavigation from '@/components/Navigation/Main.vue'
import MobileNavigation from '@/components/Navigation/Mobile.vue'
import SubNavigation from '@/components/Navigation/Sub.vue'

export default {
    name: 'app',
    components: {
        SubNavigation,
        MainNavigation,
        MobileNavigation
    },
    mixins: [mixinDevice]

}
</script>





<style lang="scss" src='./scss/app.scss'>
