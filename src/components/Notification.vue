<template>
<div class="">
    <div class="modal modal--notification flex flex--center--vert" v-if="notification.enabled">
        <p>You have <b>2</b> new to-dos</p>
        <a href="#" class='button modal__button button--sm' v-on:click="disableNotification">OK</a>
    </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Notification',

    data: function() {
        return {
            notification: {
                enabled: false,
                text: 'You have 2 new to-dos'
            }
        }
    },
    methods: {
        disableNotification: function(e) {
            e.preventDefault()
            this.notification.enabled = false;
        }
    }
}
</script>
