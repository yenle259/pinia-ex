<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Add your task here and enter..." autofocus v-model="newTask" />
    </form>
</template>

<script>
import { ref } from 'vue'
import { useToDoStore } from '../stores/ToDoStore';
import moment from 'moment'
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
                    id: Math.floor(Math.random() * 10000),
                    date:moment(String(new Date().toLocaleString())).format('L')
                })
                newTask.value = ''
            }
        }
        return { handleSubmit, newTask }
    }

}
</script>

<style scoped>
input {
    margin: 15px auto;
    width: 600px;
    height: 45px;
    padding: 2px 20px;
    border-radius: 6px;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 3px 3px 6px;
    justify-content: space-between;
    align-items: center;
    transition: 0.4s;
    border: 0px;
}
</style>