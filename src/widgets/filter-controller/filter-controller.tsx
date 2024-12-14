import {FilterType} from "../../features";

type Props = {
    changeFilter: (filter: FilterType) => void;
    currentFilter: FilterType;
    clearCompleted:()=>void
    totalTasks:number
};
export const FilterController = ({currentFilter, changeFilter, clearCompleted, totalTasks}: Props) => {
    return (
        <div>
            {totalTasks? `${totalTasks} items left` : "no tasks left" }
            <button onClick={() => changeFilter("all")} disabled={currentFilter === "all"}>All</button>
            <button onClick={() => changeFilter("active")} disabled={currentFilter === "active"}>Active</button>
            <button onClick={() => changeFilter("completed")} disabled={currentFilter === "completed"}>Completed
            </button>
            <button onClick={clearCompleted}>Clear completed</button>
        </div>
    );
};

