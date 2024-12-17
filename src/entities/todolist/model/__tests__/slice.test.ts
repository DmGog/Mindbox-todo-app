import {
    addTask,
    changeFilter,
    changeTaskStatus,
    changeTaskTitle,
    deleteCompletedTasks,
    deleteTask,
    FilterType,
    Todolist,
    todolistSlice
} from "@/entities";

let startState: Todolist;

beforeEach(() => {
    startState = {
        tasks: [
            {id: "1", title: "Посмотреть тестовое", isDone: true},
            {id: "2", title: "Сделать приложение", isDone: true},
            {id: "3", title: "Написать тесты", isDone: true},
            {id: "4", title: "Отправить на проверку", isDone: true},
            {id: "5", title: "Ответ получен?", isDone: false},
        ],
        filter: "all",
    };
});

describe("todolistSlice", () => {
    test("correct task should be deleted", () => {
        const endState = todolistSlice(startState, deleteTask({id: "2"}));
        expect(endState.tasks.length).toBe(4);
        expect(endState.tasks.every((t) => t.id !== "2")).toBeTruthy();
    });

    test("correct task should be added", () => {
        const endState = todolistSlice(startState, addTask({title: "new task"}));
        expect(endState.tasks.length).toBe(6);
        expect(endState.tasks[5].title).toBe("new task");
        expect(endState.tasks[5].isDone).toBe(false);
    });

    test("correct tasks should be deleted", () => {
        const endState = todolistSlice(startState, deleteCompletedTasks());
        expect(endState.tasks.length).toBe(1);
    });

    test("correct filter of todolist should be changed", () => {
        let newFilter: FilterType = "completed";
        const endState = todolistSlice(startState, changeFilter({filter: newFilter}));
        expect(endState.filter).toBe("completed");
    });

    test("status of specified task should be changed", () => {
        const endState = todolistSlice(startState, changeTaskStatus({id: "5"}));
        expect(endState.tasks[4].isDone).toBe(true);
    });

    test("title of specified task should be changed", () => {
        const endState = todolistSlice(startState, changeTaskTitle({id: "5", title: "Всё выполнено"}));
        expect(endState.tasks[4].title).toBe("Всё выполнено");
    });
});
