<template>
<div class="">

    <ol v-if="todos" class='list list--todos'>
        <li v-for="(todo, index) in filteredTodos" :key="index">
            <div class="p--fixed p--abs--100 card__backdrop" v-if="todo.id === activeTodoId" @click="removeActiveTodo(todo)"></div>
            <todo-item v-bind:todo="todo" v-bind:index="index" :active="todo.index === activeTodoId" />
        </li>
    </ol>

    <p v-if="todos.length < 1">There are now todos available</p>
</div>
</template>

<script>
// @ is an alias to /src
import TodoItem from '@/components/TodoItem';

import {
    mapGetters
} from 'vuex'

export default {
    name: 'TodoList',
    components: {
        TodoItem
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
            'todos',
            'activeTodoId',
            'filters'
        ]),
        filteredTodos: function() {
            let array = this.todos;
            if (this.filters.tag) {
                array = this.todos.filter(todo => todo.tags.includes(this.filters.tag));
            }
            return array
        },
    },
    methods: {
        removeActiveTodo: function(todo) {
            this.$store.dispatch('setActiveTodo', false);
            this.$store.dispatch('updateTodo', todo);
        }
    },
}
</script>
