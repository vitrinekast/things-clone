<template>
<div class="">
	<nav class='flex nav_mobile'>
		<div class="button btn--ic " @click='toggleMenu'>
			<i class="ic ic--md ic__menu"></i>
		</div>

	</nav>
	<transition name='slide-left'>
		<main-navigation v-if="menuOpen"></main-navigation>
	</transition>
</div>
</template>

<script>
import MainNavigation from '@/components/NavigationMain.vue'
import { mapGetters } from 'vuex'

export default {
	name: 'MobileNavigation',
	computed: {
		...mapGetters( [
			'menuOpen'
		] )
	},
	components: {
		MainNavigation
	},
	methods: {
		toggleMenu: function () {

			this.$store.dispatch( 'updateMenuOpen', !this.menuOpen );
		}
	}
}
</script>
