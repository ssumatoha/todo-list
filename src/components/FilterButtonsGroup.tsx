import { Button, ButtonGroup } from "react-bootstrap"
import { removeTodo } from "../store/todoSlice"
import { useAppDispatch } from "../hook"
import type { FilterPresType } from "./Todolist"

type FilterButtonsGroupType = {
    filterPres: FilterPresType,
    chFilter: (arg0: FilterPresType) => void,
}

export const FilterButtonsGroup = (props: FilterButtonsGroupType) => {

    const dispatch = useAppDispatch()

    return(
    <>
        <ButtonGroup aria-label="Basic example" className="pb-3 pt-3">
            <Button variant={props.filterPres === "all" ? "primary" : "secondary"} onClick={ () => props.chFilter("all")}>All</Button>
            <Button variant={props.filterPres === "active" ? "primary" : "secondary"} onClick={ () => props.chFilter("active") }>Active</Button>
            <Button variant={props.filterPres === "completed" ? "primary" : "secondary"} onClick={ () => props.chFilter("completed") }>Completed</Button>
        </ButtonGroup>
        <Button  className="m-3" variant="primary" onClick={() => dispatch(removeTodo())}>Clear complited</Button>
    </>
    )
}