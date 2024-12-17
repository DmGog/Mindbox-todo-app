import s from "./task.module.scss";
import {Button, Checkbox, InlineEditor} from "@/shared";
import DeleteIcon from "@/shared/assets/icons/trash.svg";
import EditIcon from "@/shared/assets/icons/edit.svg";
import clsx from "clsx";
import {useAppDispatch} from "@/app/store";
import {memo, useCallback, useState} from "react";
import {changeTaskTitle} from "@/entities";

type Props = {
    id: string;
    title: string;
    isDone: boolean;
    deleteItem: (id: string) => void;
    updateStatus: (id: string) => void;
};

export const Task = memo(({title, isDone, deleteItem, id, updateStatus}: Props) => {
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const handleChangeTitle = useCallback((newTitle: string) => {
        dispatch(changeTaskTitle({id, title: newTitle}));
    }, [id, title]);
    return (
        <div className={s.task}>
            <div className={s.container}>
                <Checkbox isChecked={isDone} onChangeChecked={() => updateStatus(id)}/>
                {editMode ? (
                    <InlineEditor value={title} onChange={handleChangeTitle} setEditMode={setEditMode}/>
                ) : (
                    <span className={clsx(s.text, {[s.checkedTask]: isDone})}
                          onDoubleClick={() => setEditMode(true)}>{title}</span>
                )}
            </div>
            <div className={s.btnWrapper}>
                {!isDone &&
                    <Button
                        aria-label={"edit-button"}
                        className={clsx(s.button, s.icon, s["edit-icon"])}
                        onClickHandler={() => setEditMode(true)}>
                        <EditIcon/>
                    </Button>}
                <Button
                    aria-label={"delete-button"}
                    className={clsx(s.button, s.icon, s["delete-icon"])}
                    onClickHandler={() => deleteItem(id)}
                >
                    <DeleteIcon/>
                </Button></div>

        </div>
    );
});
