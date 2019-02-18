<template>
<div class="">
    <ol v-if="todos" class='list list--todos'>
        <draggable v-model="todos" class="dragArea" :options="dragOptions" :move="onMove" @end="onEnd">
            <li v-for="(todo, index) in todos.filter(todo => !todo.done)" :key="index">
                <todo-item v-bind:todo="todo" v-bind:index="index" :active="index === activeIndex"  />
            </li>
        </draggable>
    </ol>

    <div v-if="todos.filter(todo => todo.done).length > 0">
        <h3>Done</h3>
        <ol class='list list--todos'>
            <draggable v-model="todos" class="dragArea" :options="dragOptions" :move="onMove" @end="onEnd">
                <li v-for="(todo, index) in todos.filter(todo => todo.done)" :key="index">
                    <todo-item v-bind:todo="todo" v-bind:index="index" :active="index === activeIndex" />
                </li>
            </draggable>
        </ol>
    </div>
    <p v-if="todos.length < 1">There are now todos available</p>
</div>

</template>

<script>
// @ is an alias to /src
import draggable from 'vuedraggable'
import TodoItem from '@/components/TodoItem';
import { mapGetters } from 'vuex'

export default {
    name: 'TodoList',
    components: {
        TodoItem,
        draggable
    },
    props: {
        filterType: String,
        tag: String
    },
    mounted() {
         this.$store.dispatch('getFilteredTodos', {
             tag: this.tag
         });
    },

    data: function() {
        return {
            message: 'fae',
            activeIndex: null,
            dragOptions: {
                group: 'people',
                animation: 150
            }
        }
    },
    computed: {
        // mix the getters into computed with object spread operator
        ...mapGetters([
          'todos'
        ])
    },
    methods: {

        onEnd: function(event) {
            console.log(event.to)
        //     const todo = store.getters.getTodoById(event.item.id);
        //     todo.location = event.to.id;
        //     document.querySelectorAll(".dropzone").forEach(elem => {
        //         elem.classList.remove('active');
        //     })
        //     this.$store.commit('editTodo', todo);
        },
        onMove: function(event) {
            console.log(event)

            document.querySelectorAll(".dropzone").forEach(elem => {
                elem.classList.remove('active');
            })
            event.to.classList.add('active');
        },
    },
}
</script>
