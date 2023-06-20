import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/Todolist';
import { useAppSelector } from './hook'

export type FilterPresType = "all" | "active" | "completed"

function App() {

  const todos = useAppSelector(state => state.todos.list)

  const [tasks, setTasks] = useState <Array<TaskType>> (todos)

  const [filterPres, setFilterPres] = useState<FilterPresType>("all")

  const removeTask = () => {
    setTasks(tasks.filter( task => !task.isDone)) 
  }

  const chFilter = (filter: FilterPresType) => {
    setFilterPres(filter)
  }

  const chIsDone = (taskId: number) => {
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = !task.isDone
    }
    setTasks([...tasks])
  }

  const appendTask = (title: string) => {
    let newTask = {id: Math.random() * 1000, title: title, isDone: false}
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  let tasksForTodolist = todos
  if (filterPres === "active") {
    tasksForTodolist = todos.filter(task => !task.isDone)
  }
  if(filterPres === "completed") {
    tasksForTodolist = todos.filter(task => task.isDone)
  }
  console.log(todos)
  
  return (
    <div className="App">
      <Todolist name="Todo list" tasks={tasksForTodolist} removeTask={removeTask} chFilter={chFilter} appendTask={appendTask} chIsDone={chIsDone} filterPres={filterPres}/>
    </div>
  );
}

export default App;
