import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { TaskType } from "../components/Todolist"

type TodoState = {
    list: Array<TaskType>
}

const initialState: TodoState = {
    list: [],
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.list.push({
                id: Math.random() * 1000,
                title: action.payload,
                isDone: false
            })
        },
        chIsDone: (state, action: PayloadAction<number>) => {
            const todo = state.list.find(todo => todo.id === action.payload)
            if(todo) {
                todo.isDone = !todo.isDone
            }
        },
        removeTodo: (state, action) => {
            state.list = state.list.filter(todo => !todo.isDone)
        }
    }
})

export const { addTodo, chIsDone, removeTodo } = todoSlice.actions
export default todoSlice.reducer