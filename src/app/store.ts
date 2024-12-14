import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {todolistSlice} from "../features/todolist/model/todolist-slice.ts";

const rootReducer = combineReducers({
    todolist: todolistSlice
})
export const store = configureStore({
    reducer: rootReducer
})
export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()