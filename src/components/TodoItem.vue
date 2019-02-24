<template>
<div class="card card--todo flex" v-bind:class="{ 'card--active': isActive(todo.id) }" @click="setActiveTodo">
    <div class="col">
        <input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="submit">
    </div>


    <div class="col col--12" v-if="isActive(todo.id)">
        <form class=""  @submit.prevent="submit" v-if="isActive(todo.id)">
            <input type="text" v-model="todo.text" name="" value="" placeholder="This is a new todo">

            <textarea name="notes" v-model="todo.notes" placeholder="notes..."></textarea>
            <todo-item-tag :todo="todo" v-if="isActive(todo.id)" :isInActiveItem="true"></todo-item-tag>
            <div class="" v-if='todo.created'>
                {{todo.planned | getPrettyDate}}
            </div>
        </form>
    </div>

    <div class="col col--12" v-else>
        <div class="fl--left">
            <p class='t--ellipsis' v-if="todo.text">{{todo.text}}</p>
            <p v-else class='t--grey'>This is a new todo</p>
        </div>
        <div v-if="todo.notes.length > 0" class="button btn--ic fl--left">
            <i class="ic ic--sm ic__attatchment"></i>
        </div>
        <todo-item-tag :todo="todo" v-if="!isActive(todo.id)" :isInActiveItem="false" class='fl--left'></todo-item-tag>
    </div>

</div>
</template>

<script>
// @ is an alias to /src
import TodoItemTag from '@/components/TodoItemTag';
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
    name: 'TodoItem',
    props: [
        'todo', 'active'
    ],
    components: {
        TodoItemTag
    },

    computed: {
        ...mapGetters([
            'activeTodoId'
        ])
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
        submit: function() {
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
