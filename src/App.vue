<template>
  <header>
    <h1>Piniaaaa</h1>
    <p>{{ toDoStore.name }}</p>
  </header>
  <nav class="filter">
    <button @click="filter = 'all'">All</button>
    <button @click="filter = 'completed'">Completed</button>
    <div class="new-task-form">
      <AddTaskForm/>
    </div>
  </nav>
  <hr>
  <div v-if="filter === 'all'">
    <h2 class="title">All Tasks ({{ toDoStore.totalCount}})</h2>
    <div class="task-list" v-for="toDoItem in toDoStore.todo">
      <ToDoItem :toDoItem="toDoItem" />
    </div>
  </div>
  <div v-if="filter === 'completed'">
    <h2 class="title">Completed Tasks ({{ toDoStore.completedCount }})</h2>
    <div class="task-list" v-for="toDoItem in toDoStore.completed">
      <ToDoItem :toDoItem="toDoItem" />
    </div>
  </div>
</template>

<script >
import { useToDoStore } from './stores/ToDoStore'
import ToDoItem from './components/ToDoItem.vue'
import { ref } from 'vue'
import AddTaskForm from './components/AddTaskForm.vue'
export default {
  components: { ToDoItem, AddTaskForm },
  setup() {
    const toDoStore = useToDoStore()
    const filter = ref('all')

    return { toDoStore, filter }
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
</style>