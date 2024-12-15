import s from "./task.module.scss"
import {Button, Checkbox} from "../../shared";

type Props = {
    id: string
    title: string
    isDone: boolean
    deleteItem: (id: string) => void
    updateStatus: (id: string) => void;

}
export const Task = ({title, isDone, deleteItem, id, updateStatus}: Props) => {
    return (
        <div className={s.task}>
            <div className={s.container}>
                <Checkbox isChecked={isDone} onChangeChecked={() => updateStatus(id)}/>
                <span>{title}</span>
            </div>
            <Button className={s.deleteButton} onClickHandler={() => deleteItem(id)}>x</Button>
        </div>
    );
};

