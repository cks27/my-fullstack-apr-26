import { useState } from "react";
function Todo(props) {
    const [tasks, setTasks] = useState([]);
    const [val, setVal] = useState("");
    const add = () => {
        tasks.push()
    }
  return (
    <>
      <section>
        <input type="text" name="val" id="val" placeholder="Add Todo"/>
        <button type="button" onclick="add">Add</button>
        <button type="button" onClick="delete">Delete</button>
      </section>
      <section>
        <ul>
            {
                tasks.map(task=> <li key={task}>{task}</li>)
            }
        </ul>
      </section>
    </>
  );
}

export default Todo;
