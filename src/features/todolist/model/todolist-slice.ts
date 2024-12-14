import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const todolistInitialState: TaskType[] = [
    {id: "1", title: "Привет", isDone: true}
]

const slice = createSlice({
    name: "todolist",
    initialState: todolistInitialState,
    reducers: {
        addTask(state, action: PayloadAction<{ title: string }>) {
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            state.push(newTask)
        }
    }
})

export const todolistSlice = slice.reducer
export const {addTask} = slice.actions