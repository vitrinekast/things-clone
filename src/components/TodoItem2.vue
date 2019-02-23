<template>
<div class="card card--todo" v-bind:class="{ 'card--active': isActive(todo.id) }" @click="setActiveTodo">

    <input v-if="!isActive(todo.id)" type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="updateTodo(todo)">
    <p v-if="!isActive(todo.id)" class='t--ellipsis'>{{todo.text}}</p>

    <div v-if="!isActive(todo.id) && todo.notes.length > 0" class="butto btn--ic">
        <i class="ic ic--sm ic__attatchment"></i>
    </div>

    <todo-item-tag :todoTags="todo.tags" v-if="!isActive(todo.id)" :isInActiveItem="false"></todo-item-tag>

    <div class="flex" v-if="isActive(todo.id)">
        <input type="checkbox" name="" v-model="todo.done" class='card__checkbox' @change="updateTodo(todo)">

        <div class="col">
            <textarea name="text" v-model="text" placeholder="A fresh new note" class='card__input' ref="todo-text" v-bind:style="textareaHeight(todo, 'todo-text')"></textarea>

            <div class="" contenteditable="true" @input="onContentEditableInput" v-html="text">
            </div>
            <textarea v-if="isActive(todo.id)" name="name" v-model="todo.notes" placeholder="Any notes?" ref="todo-note" v-bind:style="textareaHeight(todo, 'todo-note')" class='card__notes'></textarea>
            <!-- <todo-item-tag :todoTags="todo.tags" :isInActiveItem="true"></todo-item-tag> -->

            <div class="flex">
                <todo-date-component :date="todo.planned"></todo-date-component>
                <div class="col--2">
                    <button @click="remove" class='button button--yellow button--sm' type="button" name="button">delete</button>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
// @ is an alias to /src
import TodoItemTag from '@/components/TodoItemTag';
import TodoDateComponent from '@/components/TodoDate';
import {
    mapGetters
} from 'vuex'



export default {
    name: 'TodoItem',
    props: [
        'todo', 'active', 'index'
    ],
    components: {
        TodoItemTag,
        TodoDateComponent
    },
    data: function () {
        return {
            text: ''
        }
    },
    computed: {

        ...mapGetters([
            'activeTodoId'
        ]),
        formatInputField: function () {

            return 'filteredTags'
        }
    },
    mounted: function() {
        let text = this.todo.text;
        console.log(this.todo)
        this.todo.tags.forEach((tag) => {
            text += ' #' + tag + ' '
        })
        this.text = text
    },
    methods: {
        onContentEditableInput: function (e) {
            console.log(e.target.innerText)
            this.text = e.target.innerText
        },
        textareaHeight: function(todo, ref) {
            let styles = {
                height: 'auto',
                padding: 0
            }
            if(this.$refs[ref]) {
                styles.height = this.$refs[ref].scrollHeight + 'px';
            }
            return styles
        },
        isActive: function(id) {
            return id === this.activeTodoId
        },
        remove: function() {
            if (window.confirm("Do you really want to delete this todo?")) {
                this.$store.dispatch('deleteTodo', this.todo);
            }
        },
        setActiveTodo: function() {
            this.$store.dispatch('updateTodo', this.todo);
            this.$store.dispatch('setActiveTodo', this.todo);
        },
        toggleActiveTodo: function() {
            this.$store.dispatch('updateTodo', this.todo);
            this.$store.dispatch('toggleActiveTodo', this.todo);
        },
        removeActiveTodo: function() {
            this.$store.dispatch('updateTodo', this.todo);
            this.$store.dispatch('setActiveTodo', false);
        },
        updateTodo: function(todo) {
            this.$store.dispatch('updateTodo', todo);
        }
    }
}
</script>
