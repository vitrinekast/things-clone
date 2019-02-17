<template>
<nav class='nav nav--tags' v-if="tags.length > 1">
    <ul>
        <li :id="tag.id" v-for="(tag, index) in tags" :key="index" class='nav__item' v-bind:class="{ 'nav__item--active': activeTag === tag.id }" @click="activeTag = tag.id">
            {{ tag.text }}
        </li>
    </ul>
</nav>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'
export default {
    name: 'Tags',

    data: function() {
        return {
            activeTag: 2
        }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
          'tags'
        ])
    },
}
</script>
