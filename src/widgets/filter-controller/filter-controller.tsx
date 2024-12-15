import {FilterType} from "../../features";
import {Button} from "../../shared";
import s from "./filter-controller.module.scss"

type Props = {
    changeFilter: (filter: FilterType) => void;
    currentFilter: FilterType;
    clearCompleted: () => void
    totalTasks: number
};
export const FilterController = ({currentFilter, changeFilter, clearCompleted, totalTasks}: Props) => {


    return (
        <div className={s.filterController}>
            {totalTasks ? `${totalTasks} items left` : "no tasks left"}
            <Button variant={currentFilter === "all" ? "active" : "default"} onClickHandler={() => changeFilter("all")}
                    disabled={currentFilter === "all"} title={"All"}/>
            <Button variant={currentFilter === "active" ? "active" : "default"}
                    onClickHandler={() => changeFilter("active")} disabled={currentFilter === "active"}
                    title={"Active"}/>
            <Button variant={currentFilter === "completed" ? "active" : "default"}
                    onClickHandler={() => changeFilter("completed")}
                    disabled={currentFilter === "completed"} title={"Completed"}/>
            <Button onClickHandler={clearCompleted} disabled={!totalTasks} title={"Clear completed"}/>
        </div>
    );
};

