<template>
    <div class="">
        <span v-for="tag in todoTags">{{tag}}</span>
    </div>
    <!-- <ul v-if="todoTags.length > 0">
        <li v-for='(tag, index) in todoTags' class='label label--tag label--light' v-bind:class="{ 'label--green': isInActiveItem }">{{tag}}</li>
        <input v-if="isInActiveItem" class="" list="tagList" v-model="newTag" @keyup="onChange" />
        <ul v-if="autocomplete.length > 0">
            auto:<li v-for="(tag, index) in autocomplete" @click="addNewTag(tag.text)">{{tag.text}}</li>
        </ul>
    </ul> -->
</template>

<script>
    // @ is an alias to /src
    import {
        mapGetters
    } from 'vuex'
    export default {
        name: 'TodoItemTag',
        props: [
            'todoTags', 'isInActiveItem'
        ],
        data: function() {
            return {
                newTag: '',
                autocomplete: []
            }
        },
        computed: {
            ...mapGetters([
                'tags'
            ]),
            possibleTags: function () {

                const filteredTags = this.tags.filter(tag => !this.todoTags.includes(tag.text))
                return filteredTags
            }
        },
        methods: {
            onChange: function () {
                this.autocomplete = this.tags.filter(tag =>  tag.text.startsWith(this.newTag.trim()))
            },
            addNewTag: function(text) {
                this.todoTags.push(text);
                this.autocomplete = [];
                this.newTag = '';
            }
        }
    }
</script>
