import {AddItem, Task} from "../../shared";
import {AppRootState, useAppDispatch} from "../../app/store.ts";
import {addTask, TaskType} from "./model";
import {useSelector} from "react-redux";


export const Todolist = () => {

    const task = useSelector<AppRootState, TaskType[]>(state => state.todolist)
    const dispatch = useAppDispatch();
    const addItemMessage = (title: string) => {
        dispatch(addTask({title: title}))
    }

    return (
        <div>
            <AddItem addItem={addItemMessage}/>
            {task.map(e => {
                return <Task key={e.id} title={e.title} isDone={e.isDone}/>
            })}
        </div>
    );
};

