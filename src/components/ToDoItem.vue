<template>
    <div class="toDoItem task">
        <div class="icons o-left">
            <i class="material-icons" :class="{ completed: toDoItem.isCompleted }"
                @click="toDoStore.toggleCompleteStatus(toDoItem.id)">check_circle</i>
        </div>
        <h3>{{ toDoItem.title }}</h3>
        <div class="icons o-right">
            <i class="material-icons remove" @click="toDoStore.removeTask(toDoItem.id)">close</i>
        </div>
    </div>
</template>

<script>
import { useToDoStore } from '../stores/ToDoStore';

export default {
    props: ['toDoItem'],
    setup() {
        const toDoStore = useToDoStore()

        return { toDoStore }
    }
}
</script>

<style scoped>
.remove {
    color: #bc4749;
}

.completed {
    color: #06d6a0;
}
</style>