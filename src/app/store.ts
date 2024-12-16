import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {todolistSlice} from "@/entities";


const rootReducer = combineReducers({
    todolist: todolistSlice
})
export const store = configureStore({
    reducer: rootReducer
})
export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppRootState>();