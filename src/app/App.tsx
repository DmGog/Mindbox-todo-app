import s from "./app.module.scss"

import {Todolist} from "@/features";
import {useAppDispatch, useAppSelector} from "@/app/store";
import {AddItem, DialogModal} from "@/shared";
import {addTodolist, deleteTodolist} from "@/entities";
import {useCallback, useState} from "react";

function App() {
    const todolists = useAppSelector(state => state.todolists.todolists);
    const [showModalId, setShowModalId] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const handleAddItem = (title: string) => {
        dispatch(addTodolist({title}));
    };
    const handleDeleteItem = useCallback((id: string) => {
        dispatch(deleteTodolist({id}));
        setShowModalId(null);
    }, [dispatch, showModalId]);

    return (
        <div className={s.root}>
            {todolists.length === 0 && <h1 className={s.logo}>task flow</h1>}
            <AddItem addItem={handleAddItem} placeholder={"Name of your task list"} className={s.addItem}/>
            <div className={s.todolistsWrapper}>
                <div className={s.container}>
                    {todolists.map((todolist) => (
                        <div key={todolist.id}>
                            <Todolist
                                todolistId={todolist.id}
                                todolistTitle={todolist.title}
                                handleDeleteTodo={() => setShowModalId(todolist.id)}
                            />
                            <DialogModal
                                isOpen={showModalId === todolist.id}
                                title={"Delete todolist"}
                                onClickYes={() => handleDeleteItem(todolist.id)}
                                onClickNo={() => setShowModalId(null)}
                                text={`Are you sure you want to delete this todolist: ${todolist.title}?`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
