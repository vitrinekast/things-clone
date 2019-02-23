<template>
<div class="card card--todo" v-bind:class="{ 'card--active': isActive(todo.id) }" @click="setActiveTodo">
    <input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="submit">

    <div class="col" v-if="isActive(todo.id)">
        editable:
        <form class="" action="index.html" method="post" @submit.prevent="submit" v-if="isActive(todo.id)">
            <!-- <div v-once class="fn-contenteditable" contenteditable="true" @input="onKeyUp" v-html="todo.text" style='border: 1px solid red'>

            </div> -->
            <input type="text" v-model="todo.text" name="" value="">

            <input type="submit" name="" value="submit">
        </form>
        <div class="col--2">
            <button @click="remove" class='button button--yellow button--sm' type="button" name="button">delete</button>
        </div>
    </div>

    <div class="col" v-else>
        <p class='t--ellipsis'>{{todo.text}}</p>
        <div v-if="todo.notes.length > 0" class="butto btn--ic">
            <i class="ic ic--sm ic__attatchment"></i>
        </div>

    </div>

</div>
</template>

<script>
// @ is an alias to /src
import TodoItemTag from '@/components/TodoItemTag';
import TodoDateComponent from '@/components/TodoDate';
import chrono from 'chrono-node'
import moment from "moment";

import {
    mapGetters
} from 'vuex'


var getTagsFromString = (string) => {
    const regex = /\W(\#[a-zA-Z]+\b)(?!;)/gm;
    const matches = string.match(regex) ? string.match(regex) : [];

    matches.forEach((match) => {
        match.replace('#', '');
    });

    return matches;
}
export default {
    name: 'TodoItem',
    props: [
        'todo', 'active', 'index'
    ],
    components: {
        TodoItemTag,
        TodoDateComponent
    },
    data: function() {
        return {
            text: ''
        }
    },
    computed: {

        ...mapGetters([
            'activeTodoId'
        ]),
        formatInputField: function() {

            return 'filteredTags'
        }
    },

    filters: {
        getPrettyDate: function(date) {
            return moment(date).calendar(null, {
                lastDay: '[Yesterday]',
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                lastWeek: '[last] dddd',
                nextWeek: 'dddd',
                sameElse: 'L'
            })
        },
    },
    methods: {
        remove: function() {
            if (window.confirm("Do you really want to delete this todo?")) {
                this.$store.dispatch('deleteTodo', this.todo);
            }
        },

        submit: function(e) {
            this.$store.dispatch('updateTodo', this.todo);
        },
        onKeyUp: function(e) {
            this.todo.text = e.target.innerText;
        },
        isActive: function(id) {
            return id === this.activeTodoId
        },

        setActiveTodo: function() {
            this.$store.dispatch('setActiveTodo', this.todo);
        }
    }
}
</script>
