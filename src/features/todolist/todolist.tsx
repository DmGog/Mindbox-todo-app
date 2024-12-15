import {AppRootState, useAppDispatch} from "../../app/store.ts";
import {addTask, changeFilter, changeTaskStatus, deleteCompletedTasks, deleteTask, FilterType, TaskType} from "./model";
import {useSelector} from "react-redux";
import s from "./todolist.module.scss"
import {FilterController, Task} from "../../widgets";
import {AddItem, Button} from "../../shared";


export const Todolist = () => {

    const tasks = useSelector<AppRootState, TaskType[]>(state => state.todolist.tasks)
    const currentFilter = useSelector<AppRootState, FilterType>(state => state.todolist.filter)
    const dispatch = useAppDispatch();
    const handleAddItem = (title: string) => {
        dispatch(addTask({title: title}))
    }

    const handleDeleteItem = (id: string) => {
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


    const totalActiveTasks = tasks.filter(task => !task.isDone);

    return (
        <div className={s.todolist}>
            <div className={s.container}>
                <AddItem addItem={handleAddItem}/>
                {filteredTasks.map(t => {
                    return <Task key={t.id} title={t.title} isDone={t.isDone} deleteItem={handleDeleteItem} id={t.id}
                                 updateStatus={handleChangeTaskStatus}/>
                })}
            </div>
            <div className={s.activePanel}>
                <span
                    className={s.totalActiveTask}>{totalActiveTasks.length ? `${totalActiveTasks.length} items left` : "no tasks left"}</span>
                <FilterController changeFilter={handleChangeFilter} currentFilter={currentFilter}/>
                <Button onClickHandler={handleDeleteCompletedTasks}>Clear completed</Button>
            </div>
        </div>
    );
};

