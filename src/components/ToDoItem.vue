<template>
    <div class="toDoItem task">
        <h3>{{ toDoItem.title }}</h3>
        <div class="icons">
            <i class="material-icons remove"
                @click="toDoStore.removeTask(toDoItem.id)"
            >do_not_disturb_on</i>
            <i class="material-icons" :class="{completed: toDoItem.isCompleted}"
                @click="toDoStore.toggleCompleteStatus(toDoItem.id)"
            >check_circle</i>
        </div>
    </div>
</template>

<script>
import { useToDoStore } from '../stores/ToDoStore';

export default {
    props: ['toDoItem'],
    setup(){
        const toDoStore = useToDoStore()

        return {toDoStore}
    }
}
</script>

<style scoped>
    .remove{
        color: #bc4749;
    }
    .completed{
        color: #06d6a0;
    }
</style>