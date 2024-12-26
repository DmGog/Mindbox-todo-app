import {
    addTask, addTodolist,
    changeFilter,
    changeTaskStatus,
    changeTaskTitle,
    deleteCompletedTasks,
    deleteTask, deleteTodolist,
    FilterType,
    todolistsSlice, TodolistsState
} from "@/entities";

let startState: TodolistsState;

beforeEach(() => {
    startState = {
        todolists: [
            {
                id: "todolist-1",
                title: "todos",
                tasks: [
                    {id: "1", title: "Посмотреть тестовое", isDone: true},
                    {id: "2", title: "Сделать приложение", isDone: true},
                    {id: "3", title: "Написать тесты", isDone: true},
                    {id: "4", title: "Отправить на проверку", isDone: true},
                    {id: "5", title: "Ответ получен?", isDone: false},
                ],
                filter: "all",
            },
            {
                id: "todolist-2",
                title: "todos2",
                tasks: [
                    {id: "1", title: "Посмотреть тестовое", isDone: true},
                    {id: "2", title: "Сделать приложение", isDone: true},
                    {id: "3", title: "Написать тесты", isDone: true},
                ],
                filter: "all",
            }
        ],
    }
});

describe("todolistSlice", () => {

    test("correct todolist should be added", () => {
        const endState = todolistsSlice(startState, addTodolist({title: "New todo"}));
        expect(endState.todolists.length).toBe(3);
        expect(endState.todolists[2].title).toBe("New todo");
    });

    test("correct todolist should be deleted", () => {
        const endState = todolistsSlice(startState, deleteTodolist({id: "todolist-1"}));
        expect(endState.todolists.length).toBe(1);
        expect(endState.todolists.every((t) => t.id !== "todolist-1")).toBeTruthy();
    });

    test("correct task should be deleted", () => {
        const endState = todolistsSlice(startState, deleteTask({id: "2", todolistId: "todolist-1"}));
        const todolist = endState.todolists.find(t => t.id === "todolist-1")
        expect(todolist?.tasks.length).toBe(4);
        expect(todolist?.tasks.every((t) => t.id !== "2")).toBeTruthy();
    });

    test("correct task should be added", () => {
        const endState = todolistsSlice(startState, addTask({title: "new task", todolistId: "todolist-1"}));
        const todolist = endState.todolists.find(t => t.id === "todolist-1")
        expect(todolist?.tasks.length).toBe(6);
        expect(todolist?.tasks[5].title).toBe("new task");
        expect(todolist?.tasks[5].isDone).toBe(false);
    });

    test("correct tasks should be deleted", () => {
        const endState = todolistsSlice(startState, deleteCompletedTasks({todolistId: "todolist-1"}));
        const todolist = endState.todolists.find(t => t.id === "todolist-1")
        expect(todolist?.tasks.length).toBe(1);
    });

    test("correct filter of todolist should be changed", () => {
        let newFilter: FilterType = "completed";
        const endState = todolistsSlice(startState, changeFilter({filter: newFilter, todolistId: "todolist-1"}));
        const todolist = endState.todolists.find(t => t.id === "todolist-1")
        expect(todolist?.filter).toBe("completed");
    });

    test("status of specified task should be changed", () => {
        const endState = todolistsSlice(startState, changeTaskStatus({id: "5", todolistId: "todolist-1"}));
        const todolist = endState.todolists.find(t => t.id === "todolist-1")
        expect(todolist?.tasks[4].isDone).toBe(true);
    });

    test("title of specified task should be changed", () => {
        const endState = todolistsSlice(startState, changeTaskTitle({
            id: "5",
            title: "Всё выполнено",
            todolistId: "todolist-1"
        }));
        const todolist = endState.todolists.find(t => t.id === "todolist-1")
        expect(todolist?.tasks[4].title).toBe("Всё выполнено");
    });
});
