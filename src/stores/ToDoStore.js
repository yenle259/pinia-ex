// import { def } from "@vue/shared";
import { defineStore } from "pinia";

export const useToDoStore = defineStore('todoStore', {
    state: () => ({
        todo: [],
        isLoading: false
    }),
    getters: {
        getTitle(id){
            const t = this.todo.find(t => t.id === id);
            return t.title;
        },
        completed() {
            return this.todo.filter(c => c.isCompleted)
        },
        active() {
            return this.todo.filter(c => !c.isCompleted)
        },
        completedCount() {
            return this.todo.reduce((prev, task) => {
                return task.isCompleted ? prev + 1 : prev
            }, 0)
        },
        activeCount(){
            return this.todo.reduce((prev, task) => {
                return !task.isCompleted ? prev + 1 : prev
            }, 0)
        },
        totalCount(state) {
            return state.todo.length != 0 ? state.todo.length : 0
        }
    },
    actions: {
        getToDo() {
            if (localStorage.getItem('todo')) {
                try {
                    this.todo = JSON.parse(localStorage.getItem('todo'));
                } catch (e) {
                    localStorage.removeItem('todo');
                }
            }
        },
        addToDo(task) {
            this.todo.push(task);
            this.saveToDo()
        },
        saveToDo() {
            let parsed = JSON.stringify(this.todo);
            localStorage.setItem('todo', parsed);
        },
        editToDo(id,editContent){
            const editTask = this.todo.find(t => t.id === id)
            editTask.title = editContent;
            this.saveToDo();

        },
        removeTask(id) {
            this.todo = this.todo.filter(t => {
                return t.id !== id
            })
            this.saveToDo();
        },
        toggleCompleteStatus(id) {
            const task = this.todo.find(t => t.id === id)
            task.isCompleted = !task.isCompleted
            this.saveToDo();
        }
    }
})
