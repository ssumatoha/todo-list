import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterPresType = "all" | "active" | "completed"

function App() {

  let [tasks, setTasks] = useState <Array<TaskType>> ([])

  let [filterPres, setFilterPres] = useState<FilterPresType>("all")

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

  let tasksForTodolist = tasks
  if (filterPres === "active") {
    tasksForTodolist = tasks.filter(task => !task.isDone)
  }
  if(filterPres === "completed") {
    tasksForTodolist = tasks.filter(task => task.isDone)
  }
  
  return (
    <div className="App">
      <Todolist name="Todo list" tasks={tasksForTodolist} removeTask={removeTask} chFilter={chFilter} appendTask={appendTask} chIsDone={chIsDone} filterPres={filterPres}/>
    </div>
  );
}

export default App;
