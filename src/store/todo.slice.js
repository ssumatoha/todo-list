import {createSlice} from "@reduxjs/toolkit"


const initialState = []

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, {payload: task}) => {
            state.push(task)
        }
    }
})

export const {actions, reducer} = createSlice