import React, { useState } from "react";
import List from "./List";
import InputBox from "./InputBox";

function Todo() {
  const [tasksArr, setTasks] = useState([]);
  const addTask = (inputValue) => {
    const newTask = inputValue;
    // we will never mutate  a state variable on our own
    let newTaskArr = [...tasksArr, newTask];
    setTasks(newTaskArr);
  };

  const handleDelete = (idx) => {
    const updatedTasksArr = tasksArr.filter((_, index) => index !== idx);
    setTasks(updatedTasksArr);
  };

  return (
    // react Fragments
    <>
      <InputBox addTask={addTask} />
      <List tasksArr={tasksArr} handleDelete={handleDelete}></List>
    </>
  );
}

export default Todo;
