import { Accordion, Button, ButtonGroup, Form, InputGroup, ListGroup } from "react-bootstrap"
import { FilterPresType } from "./App"
import { useState } from "react"

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    name: string,
    tasks: Array<TaskType>,
    removeTask: () => void,
    chFilter: (value: FilterPresType) => void,
    appendTask: (value: string) => void,
    chIsDone: (value: number) => void,
    filterPres: FilterPresType
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.appendTask(newTaskTitle.trim())
            setNewTaskTitle("")
            console.log()
        } 
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
                        {props.tasks.map( task => <ListGroup.Item className={task.isDone ? "opacity-50" : ""} as="li" key={task.id} onChange={() => props.chIsDone(task.id)}>
                                <Form.Check checked={task.isDone} type="checkbox" label={task.title}/>
                            </ListGroup.Item>)}
                    </ListGroup>
                </Accordion.Body>
                <ButtonGroup aria-label="Basic example" className="pb-3 pt-3">
                    <Button variant={props.filterPres === "all" ? "primary" : "secondary"} onClick={ () => props.chFilter("all")}>All</Button>
                    <Button variant={props.filterPres === "active" ? "primary" : "secondary"} onClick={ () => props.chFilter("active") }>Active</Button>
                    <Button variant={props.filterPres === "completed" ? "primary" : "secondary"} onClick={ () => props.chFilter("completed") }>Completed</Button>
                </ButtonGroup>
                <Button  className="m-3" variant="primary" onClick={() => props.removeTask()}>Clear complited</Button>
            </Accordion.Item>
        </Accordion>
    </div>
    )
  }