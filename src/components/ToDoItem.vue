<template>
    <div class="toDoItem task" :class="{ completedTask: toDoItem.isCompleted }" 
        v-bind:class="{ activeTask: !toDoItem.isCompleted }"
        v-on:dblclick="editTask(toDoItem.id)">
        <div class="icons o-left">
            <i class="material-icons" :class="{ completed: toDoItem.isCompleted }"
                @click="toDoStore.toggleCompleteStatus(toDoItem.id)">check_circle</i>
        </div>
        <div class="title">
            <p> {{ toDoItem.date }}</p>
            <h3 v-show="!edit.value">{{ toDoItem.title }}</h3>
            <input :v-if="edit.value" type="text" class="edit" v-model="content">
        </div>
        <div class="icons o-right">
            <i class="material-icons remove" @click="toDoStore.removeTask(toDoItem.id)">close</i>
        </div>
    </div>
</template>

<script>
import { useToDoStore } from "../stores/ToDoStore";
import {ref} from 'vue';
export default {
    props: ["toDoItem"],
    setup() {
        const toDoStore = useToDoStore();
        const edit = ref(false);
        const content = '';
        const editTask = (id) =>{
            edit.value = true;
            content = toDoStore.title;
            console.log(id +" and "+edit.value);
            // editToDo(id);
        }
        return { edit, content, toDoStore, editTask };
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
