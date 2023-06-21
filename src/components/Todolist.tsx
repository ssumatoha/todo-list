import { Accordion, Button, ButtonGroup, ListGroup } from "react-bootstrap"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hook"
import { removeTodo } from "../store/todoSlice"
import { Task } from "./Task"
import { EntryField } from "./InputGroup"

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

    const dispatch = useAppDispatch()
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
                <ButtonGroup aria-label="Basic example" className="pb-3 pt-3">
                    <Button variant={filterPres === "all" ? "primary" : "secondary"} onClick={ () => chFilter("all")}>All</Button>
                    <Button variant={filterPres === "active" ? "primary" : "secondary"} onClick={ () => chFilter("active") }>Active</Button>
                    <Button variant={filterPres === "completed" ? "primary" : "secondary"} onClick={ () => chFilter("completed") }>Completed</Button>
                </ButtonGroup>
                <Button  className="m-3" variant="primary" onClick={() => dispatch(removeTodo())}>Clear complited</Button>
            </Accordion.Item>
        </Accordion>
    )
  }