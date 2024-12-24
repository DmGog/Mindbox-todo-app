import {useAppDispatch, useAppSelector} from "@/app/store";
import {useCallback, useState} from "react";
import {addTask, changeFilter, changeTaskStatus, deleteCompletedTasks, deleteTask, FilterType} from "@/entities";

export const useTodolist = (todolistId: string) => {
    const tasks = useAppSelector(state => state.todolists.todolists.find(todolist => todolist.id === todolistId)?.tasks || []);
    const currentFilter = useAppSelector(state => state.todolists.todolists.find(todolist => todolist.id === todolistId)?.filter || "all");
    const [showModal, setShowModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
    const [actionType, setActionType] = useState<"single" | "all" | null>(null);
    const dispatch = useAppDispatch();

    const handleAddItem = useCallback((title: string) => {
        dispatch(addTask({title, todolistId}));
    }, [dispatch, todolistId]);

    const handleDeleteItem = useCallback((id: string) => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            setTaskToDelete(task.id);
            setActionType("single");
            setShowModal(true);
        }
    }, [tasks]);

    const handleDeleteCompletedTasks = useCallback(() => {
        setActionType("all");
        setShowModal(true);
    }, []);

    const confirmDelete = () => {
        if (actionType === "single" && taskToDelete) {
            dispatch(deleteTask({id: taskToDelete, todolistId}));
            setTaskToDelete(null);
        } else if (actionType === "all") {
            dispatch(deleteCompletedTasks({todolistId}));
        }
        setShowModal(false);
        setActionType(null);
    }

    const cancelDelete = () => {
        setTaskToDelete(null);
        setShowModal(false);
        setActionType(null);
    }

    const handleChangeTaskStatus = useCallback((id: string) => {
        dispatch(changeTaskStatus({id, todolistId}));
    }, [dispatch, todolistId]);

    const handleChangeFilter = useCallback((filter: FilterType) => {
        dispatch(changeFilter({filter, todolistId}));
    }, [dispatch, todolistId]);

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.isDone;
        if (currentFilter === "active") return !task.isDone;
        return true;
    });

    const totalActiveTasks = tasks.filter(task => !task.isDone).length;

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
        currentFilter,
        actionType,
    };
};
