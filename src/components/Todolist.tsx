import { Accordion, Button, ButtonGroup, Form, InputGroup, ListGroup } from "react-bootstrap"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hook"
import { addTodo, chIsDone, removeTodo } from "../store/todoSlice"

type FilterPresType = "all" | "active" | "completed"

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

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todos.list)

    const chFilter = (filter: FilterPresType) => {
        setFilterPres(filter)
      }

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            dispatch(addTodo(newTaskTitle.trim()))
            setNewTaskTitle("")
            console.log()
        } 
    }

    
    let tasksForTodolist = todos
    if (filterPres === "active") {
        tasksForTodolist = todos.filter(task => !task.isDone)
    }
    if(filterPres === "completed") {
        tasksForTodolist = todos.filter(task => task.isDone)
    }
  
    return (
    <div>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>{props.name}</Accordion.Header>
                <Accordion.Body>
                    <InputGroup className="mb-3">
                        <Form.Control type="text" placeholder="введите текст" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.currentTarget.value)} />
                        <Button variant="primary" onClick={addTask}>Add task</Button>
                    </InputGroup>
                    <ListGroup>
                        {tasksForTodolist.map( task => <ListGroup.Item className={task.isDone ? "opacity-50" : ""} as="li" key={task.id} onChange={() => dispatch(chIsDone(task.id))}>
                                <Form.Check defaultChecked={task.isDone} type="checkbox" label={task.title}/>
                            </ListGroup.Item>)}
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
    </div>
    )
  }