<template>
<div class="home">
	<header>
		<h2>Login</h2>
	</header>
	<form class="form col col--7 col--center">
		<input type="text" name="" v-model="email" value="" class='form__input' placeholder="Email">
		<input type="password" name="" v-model="password" value="" class='form__input' placeholder="Password">
		<button class="button button--blue button--sm" @click.prevent="signUpUser" name="button"><span>register</span></button>
		<button class="button button--blue button--sm" @click.prevent="loginUser" name="button"><span>login</span></button>
		<p v-if="response">{{response}}</p>
	</form>
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
		...mapActions( 'users', [ 'signUp', 'login' ] ),
		signUpUser( e ) {
			this.signUp( { password: this.password, email: this.email } )
				.then( () => {
					this.$router.push( '/' )
					this.response = 'success!'
				} )
				.catch( ( err ) => {
					this.response = err
				} )
		},
		loginUser( e ) {
			this.login( { password: this.password, email: this.email } )
				.then( () => {
					this.$router.push( '/' )
					this.response = 'success!'
				} )
				.catch( ( err ) => {
					this.response = err
				} )
		}
		//     ...mapActions( {
		// 	signUp: 'signUp',
		// 	login: 'login',
		// 	fetchTags: 'getAllProjects',
		// } )
	}
}
</script>
