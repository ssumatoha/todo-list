import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as todosReducer } from "./todo.slice";


const reducers = combineReducers({todos: todosReducer})

export const store = configureStore({ 
    reducer: reducers,
})