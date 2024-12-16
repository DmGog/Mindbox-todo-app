import {useAppDispatch, useAppSelector} from "@/app/store";
import {useCallback, useState} from "react";
import {addTask, changeFilter, changeTaskStatus, deleteCompletedTasks, deleteTask, FilterType} from "../model";

export const useTodolist = () => {
    const tasks = useAppSelector(state => state.todolist.tasks);
    const currentFilter = useAppSelector(state => state.todolist.filter);
    const [showModal, setShowModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const handleAddItem = useCallback((title: string) => {
        dispatch(addTask({title}));
    }, [dispatch]);

    const handleDeleteItem = useCallback((id: string) => {
        const task = tasks.find(task => task.id === id);
        if (task && task.isDone) {
            dispatch(deleteTask({id}));
        } else {
            setTaskToDelete(id);
            setShowModal(true);
        }
    }, [dispatch, tasks]);

    const confirmDelete = useCallback(() => {
        if (taskToDelete) {
            dispatch(deleteTask({id: taskToDelete}));
            setTaskToDelete(null);
        }
        setShowModal(false);
    }, [dispatch, taskToDelete]);

    const cancelDelete = useCallback(() => {
        setTaskToDelete(null);
        setShowModal(false);
    }, []);

    const handleChangeTaskStatus = useCallback((id: string) => {
        dispatch(changeTaskStatus({id}));
    }, [dispatch]);

    const handleChangeFilter = useCallback((filter: FilterType) => {
        dispatch(changeFilter({filter}));
    }, [dispatch]);

    const handleDeleteCompletedTasks = useCallback(() => {
        dispatch(deleteCompletedTasks());
    }, [dispatch]);

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.isDone;
        if (currentFilter === "active") return !task.isDone;
        return true;
    });

    const totalActiveTasks = tasks.filter(task => !task.isDone);

    return {
        tasks: filteredTasks,
        totalActiveTasks,
        showModal,
        handleAddItem,
        handleDeleteItem,
        confirmDelete,
        cancelDelete,
        handleChangeTaskStatus,
        handleChangeFilter,
        handleDeleteCompletedTasks,
        currentFilter
    };
};
