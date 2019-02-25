<template>
    <div class="modal modal--calendar" v-if="events.length > 0">
        <ul>
            <li v-for="(event, index) in events" :key="index">
                <span class='modal__timestamp'>{{ event.time }}</span>{{event.text}}
            </li>
        </ul>

    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Calendar',

    data: function() {
        return {
            events: [
            
        ]

        }
    }
}
</script>
