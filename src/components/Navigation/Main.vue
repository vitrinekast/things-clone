<template>
    <nav class='nav nav--main col--2--lg col--3--md d--none--sm'>
        <ul>
            <li class='nav__item'>
                <router-link to="/">Home</router-link>
            </li>
            <li class='nav__item'>
                <router-link to="/login">Login</router-link>
            </li>
            <li class='nav__item'>
                <router-link to="/inbox">📥 Inbox</router-link>
            </li>
            <li class='nav__item'>
                <router-link to="/today">⭐ Today</router-link>
            </li>
            <li class='nav__item'>
                <router-link to="/tomorrow">🗓 Tomorrow</router-link>
            </li>
            <li class='nav__item'>
                <router-link to="/someday">🕐 Someday</router-link>
            </li>

        </ul>

        <h5>tags</h5>

        <ul>
            <li v-for="tag in tags">

                <router-link :to="{ name: 'tags', params: { id: tag.id }}">{{tag.text}}</router-link>

            </li>
        </ul>
        <h5>Areas</h5>
        <h5>Projects</h5>

        <p v-if="user">loggedin</p>

    </nav>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex'

export default {
    name: 'MainNavigation',
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
          'user',
          'tags',
          // ...
        ])
    },
    mounted() {
         this.$store.dispatch('getTags');
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
