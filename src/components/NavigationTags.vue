<template>
<nav class='nav nav_tags' v-if="tags && tags.length > 0">
	
	<ul>
		<li class='nav__item label label--tag label--light' v-bind:class="{ 'label--dark': active === false}" @click="onClick(tag)">#all</li>
		<li :id="tag.id" v-for="tag in tags" :key="tag.id" class='nav__item label label--tag label--light' v-bind:class="{ 'label--dark': active === tag.id }" @click="onClick(tag)">
			#{{ tag.text }}
		</li>
	</ul>

</nav>
</template>

<script>
// @ is an alias to /src

export default {
	props: {
		tags: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			active: false
		}
	},
	methods: {
		onClick(item) {
			this.active = item ? item.id : false
			
			if(item) {
				this.$emit( 'filter', { tag: item.text } )
			} else {
				this.$emit( 'clearFilter', { tag: false } )
			}
			
			
		}
	}
}
</script>
