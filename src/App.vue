<template>
<div id="app" class='flex flex--start d--block--sm'>
	<div class="col--2--lg col--3--md" v-if="!isMobile()">
		<aside class="aside">
			<main-navigation :projects="projects"></main-navigation>
		</aside>
	</div>
	<div class="" v-if="isMobile()">
		<mobile-navigation></mobile-navigation>
	</div>
	<main class='col--9--lg col--9--md col--12--sm'>
		<div class="container">
			<transition name='fade'>
				<router-view :key="$route.path" />
			</transition>
		</div>
	</main>

</div>
</template>

<script>
// @ is an alias to /src

import { mixinDevice } from '@/mixins/device';

import MainNavigation from '@/components/NavigationMain.vue'
import MobileNavigation from '@/components/NavigationMobile.vue'

export default {
	name: 'app',
	components: {
		MainNavigation,
		MobileNavigation
	},
	mixins: [ mixinDevice ],
	computed: {
		projects() {
			return this.$store.getters[ 'projects/projects' ]
		},
	}
}
</script>

<style lang="scss" src='./scss/app.scss'>
