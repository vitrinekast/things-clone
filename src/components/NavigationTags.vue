<template>
<nav class='nav nav_tags' v-if="tags.length > 0">

    <ul>

        <li class='nav__item label label--tag label--light' v-bind:class="{ 'label--dark': filters.tag === false}" @click="onTagClick(false)">
            all
        </li>
        <li :id="tag.id" v-for="tag in tags" :key="tag.id" class='nav__item label label--tag label--light' v-bind:class="{ 'label--dark': filters.tag === tag.id }" @click="onTagClick(tag.text)">
            #{{ tag.text }}
        </li>
    </ul>
</nav>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
export default {
    name: 'Tags',
    computed: {
        ...mapGetters([
            'tags',
            'filters'
        ])
    },
    mounted: function() {
        this.$store.dispatch('updateFilters', {tag: false});
    },
    methods: {
        onTagClick: function(value) {
            this.$store.dispatch('updateFilters', {tag: value});
        }
    }
}
</script>
