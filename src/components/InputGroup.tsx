import { useState } from "react"
import { Button, Form, InputGroup } from "react-bootstrap"
import { useAppDispatch } from "../hook"
import { addTodo } from "../store/todoSlice"


export const EntryField = () => {

    const [newTaskTitle, setNewTaskTitle] = useState("")
    
    const dispatch = useAppDispatch()

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            dispatch(addTodo(newTaskTitle.trim()))
            setNewTaskTitle("")
            console.log()
        } 
    }

    return(
        <InputGroup className="mb-3">
            <Form.Control type="text" placeholder="введите текст" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.currentTarget.value)} />
            <Button variant="primary" onClick={addTask}>Add task</Button>
        </InputGroup>
    )
}