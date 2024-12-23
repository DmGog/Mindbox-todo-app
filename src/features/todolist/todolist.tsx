import s from "./todolist.module.scss"
import {FilterController} from "@/widgets";
import {AddItem, Button, DialogModal} from "@/shared";
import {Root, Scrollbar, Thumb, Viewport,} from "@radix-ui/react-scroll-area";
import clsx from "clsx";
import {useTodolist} from "./hooks";
import {Task} from "./ui";


export const Todolist = () => {
    const {
        handleDeleteCompletedTasks,
        handleChangeFilter,
        handleAddItem,
        handleDeleteItem,
        handleChangeTaskStatus,
        confirmDelete,
        tasks,
        totalActiveTasks,
        cancelDelete,
        showModal,
        currentFilter,
        actionType
    } = useTodolist()

    const itemTextClass = clsx(s.totalActiveTask, {
        [s.hasItems]: totalActiveTasks.length > 0,
        [s.noItems]: totalActiveTasks.length === 0
    });
    return (
        <div className={s.todolist}>
            <div className={s.container}>
                <AddItem addItem={handleAddItem}/>
                <Root className={s.scrollAreaRoot}>
                    <Viewport className={s.scrollAreaViewport}>
                        {tasks.map(t => {
                            return <Task key={t.id} title={t.title} isDone={t.isDone} deleteItem={handleDeleteItem}
                                         id={t.id}
                                         updateStatus={handleChangeTaskStatus}/>
                        })}
                    </Viewport>
                    <Scrollbar className={s.scrollAreaScrollbar} orientation="vertical">
                        <Thumb className={s.scrollAreaThumb}/>
                    </Scrollbar>
                </Root>
            </div>
            <div className={s.activePanel}>
                <span
                    className={itemTextClass}>{totalActiveTasks.length ? `${totalActiveTasks.length} items left` : "no tasks left"}</span>
                <FilterController changeFilter={handleChangeFilter} currentFilter={currentFilter}/>
                <Button onClickHandler={handleDeleteCompletedTasks}>Clear completed</Button>
            </div>
            <DialogModal isOpen={showModal} title={actionType === "single" ? "Delete task" : "Delete tasks"}
                         onClickYes={confirmDelete}
                         onClickNo={cancelDelete}>  {actionType === "single"
                ? "Are you sure you want to delete this task?"
                : "Are you sure you want to delete all completed tasks?"}</DialogModal>
        </div>
    );
};

