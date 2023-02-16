<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Your task..." v-model="newTask" />
    </form>
</template>

<script>
import {ref} from 'vue'
import { useToDoStore } from '../stores/ToDoStore';
export default {
    setup() {
        const toDoStore = useToDoStore();
        const newTask = ref('')

        const handleSubmit = () => {
            if (newTask.value.length > 0) {
                toDoStore.addToDo({
                    //object
                    title: newTask.value,
                    isCompleted: false,
                    id: Math.floor(Math.random() * 10000)
                })
                newTask.value = ''
            }
        }
        return { handleSubmit, newTask }
    }

}
</script>

<style scoped>
 input{
    margin: 10px 5px 0px 0px;
 }
</style>