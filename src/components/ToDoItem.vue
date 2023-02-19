<template>
  <div
    class="toDoItem task"
    :class="{ completedTask: toDoItem.isCompleted }"
    v-bind:class="{ activeTask: !toDoItem.isCompleted }"
    v-on:dblclick="editTask(toDoItem)"
  >
    <div class="icons o-left">
      <i
        class="material-icons"
        :class="{ completed: toDoItem.isCompleted }"
        @click="toDoStore.toggleCompleteStatus(toDoItem.id)"
        >check_circle</i
      >
    </div>
    <div class="title">
      <p>{{ toDoItem.date }}</p>
      <h3 v-if="isEdit !== 'isEdited'">{{ toDoItem.title }}</h3>
      <div v-if="isEdit === 'isEdited'">
        <form class="form-edit" @submit.prevent="handleEdit(toDoItem.id)">
          <input
            class="edit"
            :class="{ completedTask: toDoItem.isCompleted }"
            type="text"
            v-model="editedContent"
          />
        </form>
      </div>
    </div>
    <div class="icons o-right">
      <i
        class="material-icons remove"
        @click="toDoStore.removeTask(toDoItem.id)"
        >close</i
      >
    </div>
  </div>
</template>

<script>
import { useToDoStore } from "../stores/ToDoStore";
import { ref } from "vue";
export default {
  props: ["toDoItem"],
  setup() {
    const toDoStore = useToDoStore();
    const isEdit = ref("");
    const editedContent = ref("");
    const editTask = (todo) => {
      isEdit.value = "isEdited";
      editedContent.value = todo.title;
    };

    const handleEdit = (id) =>{
        isEdit.value = false;
        toDoStore.editToDo(id,editedContent)
    }
    return { isEdit, toDoStore, editedContent, editTask, handleEdit };
  },
};
</script>

<style scoped>
.remove {
  color: #bc4749;
}

.form-edit {
  border: none;
}

.edit {
  border: none;
  background-color: #fbf8cc;
  font-size: 1.17em;
  font-weight: bold;
  margin-bottom: 18.72px;
  width: 100%;
}

.edit:focus {
  outline: none;
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
