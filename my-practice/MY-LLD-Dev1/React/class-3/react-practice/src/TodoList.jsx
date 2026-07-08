import { useState } from "react";
import { v4 as uuid } from "uuid";
import Todo from "./Todo";
const TodoList = () => {
  const [inpTask, setInpTask] = useState();
  const [todos, setTodos] = useState([
    {
      id: uuid(),
      task: "Go to swimming",
    },
    {
      id: uuid(),
      task: "Go to Gym",
    },
    {
      id: uuid(),
      task: "Go to Badminton ",
    },
  ]);

  const addTodoHandler = () => {
    setTodos(todos.concat({
      id: uuid(),
      task: inpTask,
    }));
    console.log(todos)
  };
  const inputTaskChangeHandler = (event) => {
    setInpTask(event.target.value);
  };
  return (
    <div>
      <h2>Todo List</h2>
      <input
        onChange={inputTaskChangeHandler}
        type="text"
        placeholder="Add Todo"
      />
      <button onClick={addTodoHandler}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} task={todo.task} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
