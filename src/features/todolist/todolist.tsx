import {AddItem, Task} from "../../shared";
import {AppRootState, useAppDispatch} from "../../app/store.ts";
import {addTask, changeFilter, changeTaskStatus, deleteCompletedTasks, deleteTask, FilterType, TaskType} from "./model";
import {useSelector} from "react-redux";
import {FilterController} from "../../widgets";


export const Todolist = () => {

    const tasks = useSelector<AppRootState, TaskType[]>(state => state.todolist.tasks)
    const currentFilter = useSelector<AppRootState, FilterType>(state => state.todolist.filter)
    const dispatch = useAppDispatch();
    const addItem = (title: string) => {
        dispatch(addTask({title: title}))
    }

    const deleteItem = (id: string) => {
        dispatch(deleteTask({id}))
    }

    const handleChangeTaskStatus = (id: string) => {
        dispatch(changeTaskStatus({id}));
    };
    const handleChangeFilter = (filter: FilterType) => {
        dispatch(changeFilter({filter}));
    };

    const handleDeleteCompletedTasks = () => {
        dispatch(deleteCompletedTasks());
    }

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") return task.isDone;
        if (currentFilter === "active") return !task.isDone;
        return true;
    });
    return (
        <div>
            <AddItem addItem={addItem}/>
            {filteredTasks.map(t => {
                return <Task key={t.id} title={t.title} isDone={t.isDone} deleteItem={deleteItem} id={t.id}
                             updateStatus={handleChangeTaskStatus}/>
            })}
            <FilterController changeFilter={handleChangeFilter} currentFilter={currentFilter}
                              clearCompleted={handleDeleteCompletedTasks} totalTasks={tasks.length}/>
        </div>
    );
};

