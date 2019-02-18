<template>
<nav class='nav nav--tags' v-if="tags.length > 1">
    <ul>
        <li class='nav__item' v-bind:class="{ 'nav__item--active': !filters.tag}" @click="clearActiveTag">
            alles
        </li>
        <li :id="tag.id" v-for="(tag, index) in tags" :key="tag.id" class='nav__item' v-bind:class="{ 'nav__item--active': filters.tag === tag.text }" @click="onTagClick(tag)">
            {{ tag.text }}
        </li>
    </ul>
</nav>
</template>

<script>
// @ is an alias to /src
import {
    mapGetters
} from 'vuex'
export default {
    name: 'Tags',
    computed: {
        ...mapGetters([
            'tags',
            'filters'
        ])
    },
    methods: {
        onTagClick: function(tag) {
            if (this.filters) {
                this.$store.dispatch('getFilteredTodos', {
                    tag: tag.text
                });
            }
        },
        clearActiveTag: function() {
            this.$store.dispatch('getFilteredTodos', {
                tag: false
            });
        }
    }
}
</script>
