<template>
<div class="home" v-if="project">
<header class='header_page'>
<h2 class='flex--center--vert'>
<i class="ic--material material-icons">folder</i>
<input type="text" v-model="project.title" placeholder="New Project" name="" value="" @blur="onBlur">
</h2>
</header>
<TodoList :todos='todos' />
</div>
</template>

<script>
import OverviewMixin from '@/views/OverviewMixin'
import { mapActions } from 'vuex'

export default {
props: ['projectId'],
mixins: [OverviewMixin],
data () {
return {
filters: {
project: false,
done: false
}
}
},
computed: {
project() {
return this.$store.getters['projects/getProjectById'](this.projectId)
},
},

methods: {
...mapActions('projects', ['updateProject']),
onBlur() {
this.updateProject({item: this.project, itemId: this.project['.key']})
}
},

}
</script>
