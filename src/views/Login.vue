<template>
<div class="home">
    <header>
        <h2>Login</h2>
    </header>
    <input type="text" name="" v-model="email" value="" placeholder="Email">
    <input type="password" name="" v-model="password" value="" placeholder="Password">
    <button type="button button--white button--md" @click="signUp({email, password})" name="button">register</button>
    <button type="button button--white button--md" @click="login({email, password})" name="button">login</button>
    <p v-if="response">{{response}}</p>
</div>
</template>

<script>
// @ is an alias to /src

import { mapActions } from 'vuex'

export default {
    name: 'home',
    components: {},
    data() {
        return {
            email: '',
            password: '',
            response: false,
        }
    },
    methods: {
        ...mapActions( {
			signUp: 'signUp',
			login: 'login',
			fetchTags: 'getAllProjects',
		} )
    }
}
</script>
