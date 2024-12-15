import s from "./task.module.scss"
import {Checkbox} from "../../shared/ui/checkbox";

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
            <Checkbox isChecked={isDone} onChangeChecked={() => updateStatus(id)}/>
            {title}
            <button className={s.button} onClick={() => deleteItem(id)}>x</button>
        </div>
    );
};

