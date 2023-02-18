<template>
    <div class="toDoItem task" :class="{ completedTask: toDoItem.isCompleted }"
        v-bind:class="{ activeTask: !toDoItem.isCompleted }">
        <div class="icons o-left">
            <i class="material-icons" :class="{ completed: toDoItem.isCompleted }"
                @click="toDoStore.toggleCompleteStatus(toDoItem.id)">check_circle</i>
        </div>
        <div class="title">
            <p> {{ toDoItem.date }}</p>
            <h3>{{ toDoItem.title }}</h3>
        </div>
        <div class="icons o-right">
            <!-- <i class="material-icons edit" @click="toDoStore.editToDo(toDoItem.id)">edit</i> -->
        </div>
        <div class="icons o-right">
            <i class="material-icons remove" @click="toDoStore.removeTask(toDoItem.id)">close</i>
        </div>
    </div>
</template>

<script>
import { useToDoStore } from "../stores/ToDoStore";

export default {
    props: ["toDoItem"],
    setup() {
        const toDoStore = useToDoStore();

        return { toDoStore };
    },
};
</script>

<style scoped>
.remove {
    color: #bc4749;
}

.edit {
    color: #7678ed;
}

.completed {
    color: #06d6a0;
}

.completedTask {
    background-color: #d8f3dc;
}

.activeTask {
    background-color: #fbf8cc;
}
</style>
