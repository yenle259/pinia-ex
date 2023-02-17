// import { def } from "@vue/shared";
import { defineStore } from "pinia";

export const useToDoStore = defineStore('todoStore', {
    state: () => ({
        todo: [],
        isLoading: false
    }),
    getters: {
        completed() {
            return this.todo.filter(c => c.isCompleted)
        },
        completedCount() {
            return this.todo.reduce((prev, task) => {
                return task.isCompleted ? prev + 1 : prev
            }, 0)
        },
        totalCount(state) {
            return state.todo.length != 0 ? state.todo.length : 0
        }
    },
    actions: {
        getToDo() {
            // console.log(localStorage.getItem('todo'))
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
        removeTask(id) {
            this.todo = this.todo.filter(t => {
                return t.id !== id
            })
            this.saveToDo();
        },
        toggleCompleteStatus(id) {
            const task = this.todo.find(t => t.id === id)
            console.log(task);
            task.isCompleted = !task.isCompleted
            this.saveToDo();
        }
        // async toggleCompleteStatus(id) {
        //     const task = this.todo.find(t => t.id === id)
        //     task.isCompleted = !task.isCompleted

        //     const res = await fetch('http://localhost:3000/todo/' + id, {
        //         method: 'PATCH',
        //         body: JSON.stringify({ isCompleted: task.isCompleted }),
        //         headers: { 'Content-Type': 'application/json' }
        //     })

        //     if (res.error) {
        //         console.log(res.error);
        //     }
        // }
    }
})
