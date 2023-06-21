import { Form, ListGroup } from "react-bootstrap"
import { TaskType } from "./Todolist"
import { useAppDispatch } from "../hook"
import { chIsDone } from "../store/todoSlice"

type OneTaskType = {
    task: TaskType,
}

export const Task = (props: OneTaskType) => {

    const dispatch = useAppDispatch()

    return (
        <ListGroup.Item className={props.task.isDone ? "opacity-50" : ""} as="li" onChange={() => dispatch(chIsDone(props.task.id))}>
            <Form.Check defaultChecked={props.task.isDone} type="checkbox" label={props.task.title}/>
        </ListGroup.Item>
    )
}