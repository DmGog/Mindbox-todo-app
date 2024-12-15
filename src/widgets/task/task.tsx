import s from "./task.module.scss";
import {Button, Checkbox, InlineEditor} from "../../shared";
import DeleteIcon from "../../shared/assets/icons/trash.svg";
import EditIcon from "../../shared/assets/icons/edit.svg";
import clsx from "clsx";
import {changeTaskTitle} from "../../features";
import {useAppDispatch} from "../../app/store.ts";
import {useState} from "react";

type Props = {
    id: string;
    title: string;
    isDone: boolean;
    deleteItem: (id: string) => void;
    updateStatus: (id: string) => void;
};

export const Task = ({title, isDone, deleteItem, id, updateStatus}: Props) => {
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);

    const handleChangeTitle = (newTitle: string) => {
        dispatch(changeTaskTitle({id, title: newTitle}));
    };

    return (
        <div className={s.task}>
            <div className={s.container}>
                <Checkbox isChecked={isDone} onChangeChecked={() => updateStatus(id)}/>
                {editMode ? (
                    <InlineEditor value={title} onChange={handleChangeTitle} setEditMode={setEditMode}/>
                ) : (
                    <span onDoubleClick={() => setEditMode(true)}>{title}</span>
                )}
            </div>
            <Button
                aria-label={"edit-button"}
                className={clsx(s.button, s.icon, s["edit-icon"])}
                onClickHandler={() => setEditMode(true)}
            >
                <EditIcon/>
            </Button>
            <Button
                aria-label={"delete-button"}
                className={clsx(s.button, s.icon, s["delete-icon"])}
                onClickHandler={() => deleteItem(id)}
            >
                <DeleteIcon/>
            </Button>
        </div>
    );
};
