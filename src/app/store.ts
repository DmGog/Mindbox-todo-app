import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {todolistSlice} from "@/entities";
import {loadState, saveState} from "@/shared";


const rootReducer = combineReducers({
    todolist: todolistSlice
});

const preloadedState = loadState("todo-state");

export const store = configureStore({
    reducer: rootReducer,
    preloadedState
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
    saveState("todo-state", store.getState());
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppRootState>();
