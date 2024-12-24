import s from "./app.module.scss"

import {Todolist} from "@/features";
import {useAppDispatch, useAppSelector} from "@/app/store";
import {Accordion, AddItem} from "@/shared";
import {addTodolist, deleteTodolist} from "@/entities";

function App() {
    const todolists = useAppSelector(state => state.todolists.todolists);
    const dispatch = useAppDispatch();
    const handleAddItem = (title: string) => {
        dispatch(addTodolist({title}));
    };


    return (
        <div className={s.root}>
            {todolists.length === 0 && <h1 className={s.logo}>task flow</h1>}
            <AddItem addItem={handleAddItem} placeholder={"Name of your task list"} className={s.addItem}/>
            <div className={s.container}>
                {todolists.map((todolist) => {
                    const handleDeleteTodo = () => {
                        dispatch(deleteTodolist({id: todolist.id}))
                    }
                    return (
                            <Accordion key={todolist.id} title={todolist.title} deleteItem={handleDeleteTodo}>
                                <Todolist todolistId={todolist.id}/>
                            </Accordion>
                    )
                })}
            </div>
        </div>
    )
}

export default App
