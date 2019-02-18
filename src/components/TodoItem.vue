<template>
    <div class="">

        <div class="p--fixed p--abs--100" v-if="isActive(todo.id)" @click="removeActiveTodo"></div>

        <div class="card card--todo" v-bind:class="{ 'card--active': isActive(todo.id) }" :id="todo.id" @click="setActiveTodo">
            <input v-if="!isActive(todo.id)" type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="updateTodo(todo)">
            <p v-if="!isActive(todo.id)" class='t--ellipsis'>{{todo.text}}</p>
            <div v-if="!isActive(todo.id) && todo.notes.length > 0" class="butto btn--ic">
                <i class="ic ic--sm ic__attatchment"></i>
            </div>

            <div class="flex" v-if="isActive(todo.id)">
                <input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="updateTodo(todo)">

                <div class="col">
                    <textarea name="text" v-model="todo.text" placeholder="A fresh new note" class='card__input'></textarea>
                    <textarea v-if="isActive(todo.id)" name="name" v-model="todo.notes" placeholder="Any notes?" class='card__notes'></textarea>

                    <div v-if="isActive(todo.id)" class="flex">
                        <input type="date" id="start" name="trip-start" v-model="todo.planned" min="2018-01-01">
                        <div class="col--2">
                            <button @click="remove" class='button button--red button--sm' type="button" name="button">delete</button>
                        </div>
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
        props: [
            'todo', 'active', 'index'
        ],
        computed: {

            activeTodoId: {
                get() {
                    return this.$store.getters.activeTodoId
                }
            }
        },
        methods: {
            isActive: function (id) {
                return id === this.activeTodoId
            },
            remove: function () {
                if (window.confirm("Do you really want to delete this todo?")) {
                    this.$store.dispatch('deleteTodo', this.todo);
                }
            },
            setActiveTodo: function () {
                this.$store.dispatch('updateTodo', this.todo);
                this.$store.dispatch('setActiveTodo', this.todo);
            },
            toggleActiveTodo: function () {
                this.$store.dispatch('updateTodo', this.todo);
                this.$store.dispatch('toggleActiveTodo', this.todo);
            },
            removeActiveTodo: function () {
                this.$store.dispatch('updateTodo', this.todo);
                this.$store.dispatch('setActiveTodo', false);
            },
            updateTodo: function (todo) {
                this.$store.dispatch('updateTodo', todo);
            }
        }
    }
</script>
