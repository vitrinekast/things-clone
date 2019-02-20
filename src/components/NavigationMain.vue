<template>
<nav class='nav nav--main'>
    <p v-if="user">You're logged in!</p>
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
        <li class='nav__item'>
            <router-link to="/styleguide">Style guide</router-link>
        </li>

    </ul>

    <h5 v-if="projects">Projects</h5>

    <div class="p--abs p--abs--bottom flex flex--center">
        <div class="col button button--white button--sm" @click="createTodo">
            new todo
        </div>
        <div class="col button button--white button--sm">
            new project
        </div>
    </div>

</nav>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    name: 'MainNavigation',
    data: function () {
        return {
            projects: []
        }
    },
    computed: {

        ...mapGetters([
            'user',
            'tags',
            // ...
        ])
    },
    mounted() {
        this.$store.dispatch('getTags');
    },
    methods: {
        createTodo: function() {
            this.$store.dispatch('createTodo');
        }
    }
}
</script>
