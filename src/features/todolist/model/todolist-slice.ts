import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const todolistInitialState = {
    tasks: [
        {id: "1", title: "Привет", isDone: true} as TaskType,
    ],
    filter: "all" as FilterType
};

const slice = createSlice({
    name: "todolist",
    initialState: todolistInitialState,
    reducers: {
        addTask(state, action: PayloadAction<{ title: string }>) {
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            state.tasks.push(newTask)
        },
        deleteTask(state, action: PayloadAction<{ id: string }>) {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks.splice(index, 1);
            }
        },
        deleteCompletedTasks(state) {
            state.tasks = state.tasks.filter(task => !task.isDone);
        },
        changeFilter(state, action: PayloadAction<{ filter: FilterType }>) {
            state.filter = action.payload.filter;
        },
        changeTaskStatus(state, action: PayloadAction<{ id: string }>) {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.isDone = !task.isDone;
            }
        }
    }
})

export const todolistSlice = slice.reducer
export const {addTask, deleteTask, changeFilter, changeTaskStatus, deleteCompletedTasks} = slice.actions