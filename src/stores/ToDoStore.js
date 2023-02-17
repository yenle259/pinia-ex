// import { def } from "@vue/shared";
import { defineStore } from "pinia";

export const useToDoStore = defineStore('todoStore', {
    state: () => ({
        todo: [ ],
        name: ":vv",
        isLoading:false
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
            return state.todo.length != 0 ? state.todo.length:0
        }
    },
    actions: {
        async getToDo() {
            this.isLoading = true

            const res = await fetch('http://localhost:3000/todo')
            const data = await res.json()

            this.todo = data
            this.isLoading = false
        },
        async addToDo(task) {
            this.todo.push(task)

            const res = await fetch('http://localhost:3000/todo',{
                method:'POST',
                body:JSON.stringify(task),
                headers:{'Content-Type':'application/json'}
            })

            if(res.error){
                console.log(res.error);
            }
        },
        async removeTask(id) {
            this.todo = this.todo.filter(t => {
                return t.id !== id
            })

            const res = await fetch('http://localhost:3000/todo/'+id,{
                method:'DELETE',
            })

            if(res.error){
                console.log(res.error);
            }
        },
        async toggleCompleteStatus(id) {
            const task = this.todo.find(t => t.id === id)
            // console.log(task);
            task.isCompleted = !task.isCompleted

            const res = await fetch('http://localhost:3000/todo/'+id,{
                method:'PATCH',
                body:JSON.stringify({isCompleted: task.isCompleted}),
                headers:{'Content-Type':'application/json'}
            })

            if(res.error){
                console.log(res.error);
            }
        }
    }
})
