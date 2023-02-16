// import { def } from "@vue/shared";
import { defineStore } from "pinia";

export const useToDoStore = defineStore('todoStore', {
    state: () => ({
        todo: [
            { id: 1, title: "buy some stuff", isCompleted: true },
            { id: 2, title: "learning pinia course", isCompleted: false },
            { id: 3, title: "prepare for catchup meeting tomorrow", isCompleted: false },
            { id: 4, title: "take shower :))", isCompleted: true },
            { id: 5, title: "take an english exam :))", isCompleted: false },
        ],
        name: ":vv"
    }),
    getters: {
        completed(){
            return this.todo.filter(c => c.isCompleted)
        },
        completedCount(){
            return this.todo.reduce((prev, task)=>{
                return task.isCompleted? prev + 1: prev
            },0)
        },
        totalCount(state){
            return state.todo.length
        }
    },
    actions:{
        addToDo(task){
            this.todo.push(task)
        },
        removeTask(id){
            this.todo = this.todo.filter(t => {
                return t.id !== id
            })
        },
        toggleCompleteStatus(id){
            const task = this.todo.find(t => t.id === id)
            // console.log(task);
            // task.isCompleted = !task.isCompleted
            task.isCompleted = true
        }
    }
})
