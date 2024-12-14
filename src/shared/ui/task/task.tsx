import {Checkbox} from "@mui/material";

type Props = {
    title: string
    isDone: boolean

}
export const Task = ({title, isDone}: Props) => {
    return (
        <div>
            <Checkbox checked={isDone}/> {title}
        </div>
    );
};

