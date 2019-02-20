<template>
    <ul v-if="tags.length > 0">
        <li v-for='(tag, index) in tags' class='label label--tag label--light' v-bind:class="{ 'label--green': isInActiveItem }">{{tag}}</li>
    </ul>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'TodoItemTag',
        props: [
            'tags', 'isInActiveItem'
        ],

        methods: {

        }
    }
</script>
