<template>
<nav class='nav nav--main' v-bind:class="{ 'nav--active': menuOpen }">
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
    </ul>

    <h5 v-if="projects">Projects</h5>
    <li class='nav__item' v-for="(project, index) in projects" :key="index">
        <router-link :to="{ name: 'project', params: { projectId: project.id }}">
            <span v-if="project.title">{{project.title}}</span>
            <span v-else>A new project</span>
        </router-link>
    </li>

    <div class="button button--bordered button--grey button--sm d--inl-block" @click="createProject">
        new project
    </div>

    <div class="p--abs p--abs--bottom flex flex--center">

        <div class="col button button--white button--sm" @click="deleteAllTodos">
            delete all todos
        </div>
        <div class="col button button--white button--sm" @click="deleteAllTags">
            delete all tags
        </div>

    </div>


</nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'MainNavigation',
    props: ['menuOpen'],
    computed: {
        ...mapGetters([
            'user',
            'tags',
            'projects'
        ])
    },
    methods: {
        createProject: function() {
            this.$store.dispatch('createProject');
        },
        deleteAllTodos: function() {
            this.$store.dispatch('deleteAllTodos');
        },
        deleteAllTags: function() {
            this.$store.dispatch('deleteAllTags');
        }
    }
}
</script>
