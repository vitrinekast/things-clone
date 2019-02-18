

<template>
    <div class="">
        <div class="p--fixed p--abs--100" v-if="isActive(todo.id)" @click="removeActiveTodo"></div>

    <div class='card card--todo flex' v-bind:class="{ 'card--active': isActive(todo.id) }" :id="todo.id" @dblclick="toggleActiveTodo">
        <input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="updateTodo(todo)">

        <div class="col" v-if="!isActive(todo.id)">
            <p>{{todo.text}}</p>
        </div>

        <div class="col" v-if="isActive(todo.id)">
            <input type="text" v-model="todo.text" name="" class='card__input'>
            <textarea name="name" v-model="todo.notes" placeholder="Any notes?" class='card__notes'>Hier zijn allemaal verschillende notes</textarea>

            <div class="flex">
                <input type="date" id="start" name="trip-start" v-model="todo.planned" min="2018-01-01">
                <div class="col--2">
                    <button @click="remove" class='button button--red button--sm' type="button" name="button">delete</button>
                </div>
            </div>
        </div>

    </div>
    </div>
</template>

<script>


// @ is an alias to /src

export default {
    name: 'TodoItem',
    props: ['todo', 'active', 'index'],
    computed: {

        activeTodoId: {
            get() {
                return this.$store.getters.activeTodoId
            }
        }
    },
    methods: {
        // \W(\#[a-zA-Z]+\b)(?!;)
        isActive: function(id) {
            return id === this.activeTodoId
        },
        remove: function() {
            if (window.confirm("Do you really want to delete this todo?")) {
                this.$store.dispatch('deleteTodo', this.todo);
            }
        },
        toggleActiveTodo: function() {
            this.$store.dispatch('updateTodo', this.todo);
            this.$store.dispatch('setActiveTodo', this.todo);
        },
        removeActiveTodo: function() {
            this.$store.dispatch('updateTodo', this.todo);
            this.$store.dispatch('setActiveTodo', false);
        },
        updateTodo: function(todo) {
            console.log('updating todo', todo)
            this.$store.dispatch('updateTodo', todo);
        },
    },
}
</script>
