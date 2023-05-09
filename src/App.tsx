import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


//CRUD
//C-create
//R-read (filter, search, sort, pagination)
//U-update
//D-delete

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListId: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title:  "What to learn", filter: "all"},
        {id: todoListId_2, title:  "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS/ES6&TS", isDone: true},
            {id: v1(), title: "REACT/REDUX", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: true},
            {id: v1(), title: "BREAD", isDone: false},
        ],
    })


    const removeTask = (taskId: string, todoListId: string) => {
        const updatedTasks = tasks[todoListId].filter(t => t.id !== taskId)
        setTasks({...tasks, [todoListId]: updatedTasks})
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const updatedTasks = [newTask, ...tasks[todoListId]]
        setTasks({...tasks, [todoListId]: updatedTasks})
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        const updatedTasks = tasks[todoListId].map(t => t.id === taskId
            ? {...t, isDone: newIsDoneValue}
            : t
        )
        setTasks({...tasks, [todoListId]: updatedTasks})
    }
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        const updatedTasks = tasks[todoListId].map(t => t.id === taskId
            ? {...t, title: title}
            : t
        )
        setTasks({...tasks, [todoListId]: updatedTasks})
    }

    const changeTodoListFilter = (nextFilter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId
            ? {...tl, filter: nextFilter}
            :  tl
        ))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        const copy = {...tasks}
        delete copy[todoListId]
        setTasks(copy)
    }
    const addTodoList = (title: string) => {
        const todoListId = v1()
        const newTodo: TodoListType = {
            id: todoListId,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [todoListId]: []})
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId
            ? {...tl, title: title}
            :  tl
        ))
    }

    const getTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }

    const todoListsComponents: JSX.Element[] = todoLists.map(tl => {
        const tasksWhatIWantToSee = getTasksForRender(tasks[tl.id], tl.filter)
        return(
            <TodoList
                todoListId={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksWhatIWantToSee}

                addTask={addTask}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
                changeTaskStatus={changeTaskStatus}

                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}
                changeTodoListFilter={changeTodoListFilter}
            />
        )
    })





    return (
        <div className="App">
            <AddItemForm titleMaxLength={25} addItem={addTodoList} />
            {todoListsComponents}
        </div>
    );
}

export default App;
