import s from "./todolist.module.scss";
import {FilterController} from "@/widgets";
import {Accordion, AddItem, Button, DialogModal, Scroll} from "@/shared";
import clsx from "clsx";
import {useTodolist} from "./hooks";
import {Task} from "./ui";

type TodolistProps = {
    todolistId: string;
    todolistTitle: string,
    handleDeleteTodo: () => void
}

export const Todolist = ({todolistId, todolistTitle, handleDeleteTodo}: TodolistProps) => {
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
        actionType,
    } = useTodolist(todolistId);

    const itemTextClass = clsx(s.totalActiveTask, {
        [s.hasItems]: totalActiveTasks > 0,
        [s.noItems]: totalActiveTasks === 0
    });

    return (
        <Accordion id={todolistId} title={todolistTitle} deleteItem={
            handleDeleteTodo}>
            <div className={s.todolist}>
                <AddItem addItem={handleAddItem} showButtonArrow/>
                <div className={s.container}>
                    <Scroll>
                        {tasks.map(t => (
                            <Task
                                key={t.id}
                                title={t.title}
                                isDone={t.isDone}
                                deleteItem={handleDeleteItem}
                                id={t.id}
                                updateStatus={handleChangeTaskStatus}
                                todolistId={todolistId}
                            />
                        ))}
                    </Scroll>
                </div>
                <div className={s.activePanel}>
                <span className={itemTextClass}>
                    {totalActiveTasks ? `${totalActiveTasks} items left` : "no tasks left"}
                </span>
                    <FilterController changeFilter={handleChangeFilter} currentFilter={currentFilter}/>
                    <Button
                        className={s.btnDeleteCompleted}
                        onClickHandler={handleDeleteCompletedTasks}
                        disabled={tasks.filter(e => e.isDone).length === 0}
                    >
                        Clear completed
                    </Button>
                </div>
                <DialogModal
                    isOpen={showModal}
                    title={actionType === "single" ? "Delete task" : "Delete tasks"}
                    onClickYes={confirmDelete}
                    onClickNo={cancelDelete}
                    text={actionType === "single"
                        ? "Are you sure you want to delete this task?"
                        : "Are you sure you want to delete all completed tasks?"}
                />
            </div>
        </Accordion>
    );
};

