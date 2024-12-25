import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";

export type FilterType = "all" | "active" | "completed";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type Todolist = {
    id: string
    title: string
    tasks: TaskType[];
    filter: FilterType;
    active: boolean;
}
export type TodolistsState = {
    todolists: Todolist[];
}

const todolistsInitialState: TodolistsState = {
    todolists: [
        {
            id: v1(),
            title: "todos",
            tasks: [
                {id: "1", title: "Посмотреть тестовое", isDone: true},
                {id: "2", title: "Сделать приложение", isDone: true},
                {id: "3", title: "Написать тесты", isDone: true},
                {id: "4", title: "Отправить на проверку", isDone: true},
                {id: "5", title: "Ответ получен?", isDone: false},
            ],
            filter: "all",
            active:false
        }
    ],
};
const slice = createSlice({
    name: "todolists",
    initialState: todolistsInitialState,
    reducers: {
        addTodolist(state, action: PayloadAction<{ title: string }>) {
            const newTodolist: Todolist = {
                id: v1(),
                title: action.payload.title,
                tasks: [],
                filter: "all",
                active:false
            };
            state.todolists.push(newTodolist);
        },
        deleteTodolist(state, action: PayloadAction<{ id: string }>) {
            const index = state.todolists.findIndex(todolist => todolist.id === action.payload.id);
            if (index !== -1) {
                state.todolists.splice(index, 1);
            }
        },
        addTask(state, action: PayloadAction<{ title: string, todolistId: string }>) {
            const todolist = state.todolists.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) {
                const newTask = {id: v1(), title: action.payload.title, isDone: false};
                todolist.tasks.push(newTask);
            }
        },
        deleteTask(state, action: PayloadAction<{ id: string, todolistId: string }>) {
            const todolist = state.todolists.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) {
                const index = todolist.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    todolist.tasks.splice(index, 1);
                }
            }
        },
        deleteCompletedTasks(state, action: PayloadAction<{ todolistId: string }>) {
            const todolist = state.todolists.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) {
                todolist.tasks = todolist.tasks.filter(task => !task.isDone);
            }
        },
        changeFilter(state, action: PayloadAction<{ filter: FilterType, todolistId: string }>) {
            const todolist = state.todolists.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) {
                todolist.filter = action.payload.filter;
            }
        },
        changeTaskStatus(state, action: PayloadAction<{ id: string, todolistId: string }>) {
            const todolist = state.todolists.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) {
                const task = todolist.tasks.find(task => task.id === action.payload.id);
                if (task) {
                    task.isDone = !task.isDone;
                }
            }
        },
        changeTaskTitle(state, action: PayloadAction<{ title: string, id: string, todolistId: string }>) {
            const todolist = state.todolists.find(todolist => todolist.id === action.payload.todolistId);
            if (todolist) {
                const task = todolist.tasks.find(task => task.id === action.payload.id);
                if (task) {
                    task.title = action.payload.title
                }
            }
        }
    }
});

export const todolistsSlice = slice.reducer;
export const {
    addTodolist,
    deleteTodolist,
    addTask,
    deleteTask,
    deleteCompletedTasks,
    changeFilter,
    changeTaskStatus,
    changeTaskTitle
} = slice.actions;