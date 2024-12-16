import {Button} from "@/shared";
import s from "./filter-controller.module.scss"
import {memo} from "react";
import {FilterType} from "@/entities";

type Props = {
    changeFilter: (filter: FilterType) => void;
    currentFilter: FilterType;
};
export const FilterController = memo(({currentFilter, changeFilter}: Props) => {

    return (
        <div className={s.filterController}>
            <Button variant={currentFilter === "all" ? "active" : "default"} onClickHandler={() => changeFilter("all")}
                    disabled={currentFilter === "all"}>All</Button>
            <Button variant={currentFilter === "active" ? "active" : "default"}
                    onClickHandler={() => changeFilter("active")} disabled={currentFilter === "active"}>Active</Button>
            <Button variant={currentFilter === "completed" ? "active" : "default"}
                    onClickHandler={() => changeFilter("completed")}
                    disabled={currentFilter === "completed"}>Completed</Button>
        </div>
    );
});

