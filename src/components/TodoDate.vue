
                <template>
                    <input type="date" name="todo-start" v-model="date" min="2018-01-01">
                </template>

                <script>
                    // @ is an alias to /src

                    export default {
                        name: 'TodoDate',
                        props: [
                            'date'
                        ],

                        methods: {

                        }
                    }
                </script>
