import {Checkbox} from "@mui/material";

type Props = {
    id: string
    title: string
    isDone: boolean
    deleteItem: (id: string) => void
    updateStatus: (id: string) => void;

}
export const Task = ({title, isDone, deleteItem, id, updateStatus}: Props) => {
    return (
        <div>
            <Checkbox checked={isDone} onClick={() => updateStatus(id)}/> {title}
            < button onClick={() => deleteItem(id)}>x</button>
        </div>
    );
};

