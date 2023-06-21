import { Accordion, ListGroup } from "react-bootstrap"
import { useState } from "react"
import { useAppSelector } from "../hook"
import { Task } from "./Task"
import { EntryField } from "./EntryField"
import { FilterButtonsGroup } from "./FilterButtonsGroup"

export type FilterPresType = "all" | "active" | "completed"

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    name: string,
}

export const Todolist = (props: TodolistPropsType) => {

    const [filterPres, setFilterPres] = useState<FilterPresType>("all")

    const todos = useAppSelector(state => state.todos.list)

    const chFilter = (filter: FilterPresType) => {
        setFilterPres(filter)
      }

    let tasksForTodolist = todos
    if (filterPres === "active") {
        tasksForTodolist = todos.filter(task => !task.isDone)
    }
    if(filterPres === "completed") {
        tasksForTodolist = todos.filter(task => task.isDone)
    }
  
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>{props.name}</Accordion.Header>
                <Accordion.Body>
                <EntryField/>
                    <ListGroup>
                        {tasksForTodolist.map( task => <Task task={task} key={task.id} />)}
                    </ListGroup>
                </Accordion.Body>
                <FilterButtonsGroup filterPres={filterPres} chFilter={chFilter} />
            </Accordion.Item>
        </Accordion>
    )
  }