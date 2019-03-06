<template>
<nav class='nav nav_tags' v-if="tags && tags.length > 0">
	<ul>
		<li class='nav__item label label--tag label--light' v-bind:class="{ 'label--dark': filters.tag === false}" @click="onTagClick({tag: undefined})">#all</li>
		<li :id="tag.id" v-for="tag in tags" :key="tag.id" class='nav__item label label--tag label--light' v-bind:class="{ 'label--dark': filters.tag === tag.text }" @click="onTagClick({tag: tag.text})">
			#{{ tag.text }}
		</li>
	</ul>
</nav>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'Tags',
	computed: {
		...mapGetters( [
			'tags',
			'filters'
		] )
	},
	methods: {
		...mapActions( { onTagClick: 'updateFilters' } ),
	}
}
</script>
