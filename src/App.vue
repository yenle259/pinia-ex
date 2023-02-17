<template>
  <nav class="filter">
    <button @click="toDoStore.$reset">Reset</button>
    <button @click="filter = 'all'" 
      :class="{all: filter==='all'}"
    >All ({{ toDoStore.totalCount }})</button>
    <button @click="filter = 'completed'"
    :class="{completed: filter==='completed'}"
    >Completed ({{ toDoStore.completedCount }})</button>
    <div class="new-task-form">
      <AddTaskForm />
    </div>
  </nav>
  <hr>
  <div v-if="filter === 'all'">
    <div class="task-list" v-for="toDoItem in todo">
      <ToDoItem :toDoItem="toDoItem" />
    </div>
  </div>
  <div v-if="filter === 'completed'">
    <div class="task-list" v-for="toDoItem in completed">
      <ToDoItem :toDoItem="toDoItem" />
    </div>
  </div>
</template>

<script >
import { useToDoStore } from './stores/ToDoStore'
import ToDoItem from './components/ToDoItem.vue'
import { ref } from 'vue'
import AddTaskForm from './components/AddTaskForm.vue'
import { storeToRefs } from 'pinia'
export default {
  components: { ToDoItem, AddTaskForm },
  setup() {
    const toDoStore = useToDoStore()
    const filter = ref('all')
    const { todo, name, isLoading, completed } = storeToRefs(toDoStore)
    //fetch toDoList
    toDoStore.getToDo()

    return { toDoStore, filter, todo, name, isLoading, completed }
  },
}
</script>

<style scoped>
.title {
  text-align: center;
  color: palevioletred;
}

.filter {
  display: flex;
  justify-content: center;
}

button {
  min-width: 70px;
  margin: 10px 5px 0px 0px;
}

.completed{
  background-color: #06d6a0;
}
.all{
  background-color: lightskyblue;
}
</style>