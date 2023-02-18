<template>
  <div class="new-task-form">
    <AddTaskForm />
  </div>
  <nav class="filter">
    <h2 class="name">TODOLIST</h2>
    <!-- <button @click="toDoStore.$reset">Reset</button> -->
    <button class="b-all" @click="filter = 'all'" :class="{ all: filter === 'all' }">All
      ({{ toDoStore.totalCount }})</button>
    <button class="b-active" @click="filter = 'active'" :class="{ active: filter === 'active' }">Active
      ({{ toDoStore.activeCount }})</button>
    <button class="b-completed" @click="filter = 'completed'" :class="{ completed: filter === 'completed' }">Completed
      ({{ toDoStore.completedCount }})</button>

  </nav>

  <div v-if="filter === 'all'">
    <div class="task-list" v-for="toDoItem in todo">
      <ToDoItem :toDoItem="toDoItem" />
    </div>
  </div>
  <div v-if="filter === 'active'">
    <div class="task-list" v-for="toDoItem in active">
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
    const { todo, name, isLoading, completed, active } = storeToRefs(toDoStore)
    //fetch toDoList
    toDoStore.getToDo()

    return { toDoStore, filter, todo, isLoading, completed, active }
  },
}
</script>

<style scoped>
.title {
  text-align: center;
  color: palevioletred;
}

.filter {
  max-height: fit-content;
  max-width: 640px;
  margin: 2px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.name {
  font-size: 40px;
  font-style: italic;
  font-weight: 444;
  flex-grow: 2;
  margin: 0px auto;
}

.filter button {
  height: fit-content;
  min-width: 80px;
  margin-left: 5px;
  padding: 5px;
  font-size: medium;
}

.completed {
  background-color: #06d6a0;
}

.active {
  background-color: #F2921D;
}

.all {
  background-color: lightskyblue;
}

.b-all {
  border-color: #003f88;
}

.b-active {
  border-color: #F99417;
}

.b-completed {
  border-color: #06d6a0;
}</style>