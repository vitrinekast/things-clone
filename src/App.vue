<template>
<div id="app" class='flex flex--start d--block--sm'>
	<div class="col--2--lg col--3--md" v-if="!isMobile()">
		<aside class="aside">
			<main-navigation></main-navigation>
		</aside>
	</div>
	<div class="" v-if="isMobile()">
		<mobile-navigation></mobile-navigation>
	</div>
	<main class='col--9--lg col--9--md col--12--sm'>
		<div class="container">
			<router-view />
			<fab-navigation></fab-navigation>
		</div>
	</main>

</div>
</template>

<script>
// @ is an alias to /src

import { mixinDevice } from '@/mixins/device';

import MainNavigation from '@/components/NavigationMain.vue'
import MobileNavigation from '@/components/NavigationMobile.vue'
import FabNavigation from '@/components/FabNavigation.vue'

export default {
	name: 'app',
	components: {
		MainNavigation,
		MobileNavigation,
		FabNavigation
	},
	mixins: [ mixinDevice ],
	mounted: function () {
		this.fetchTodos();
		this.fetchTags();
		this.fetchProjects();
	},
	methods: {
		fetchTodos() {
			this.$store.dispatch( 'getAllTodos' );
		},
		fetchProjects() {
			this.$store.dispatch( 'getAllTags' );
		},
		fetchTags() {
			this.$store.dispatch( 'getAllProjects' );
		}
	}

}
</script>





<style lang="scss" src='./scss/app.scss'>
