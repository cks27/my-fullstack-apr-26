// import { useState } from "react";
function Todo(props) {
    // const [tasks, setTasks] = useState([]);
    // const [val, setVal] = useState("");
    // const addHandler = (event) => {
    //   console.log(event.target.value)
    //     tasks.push(event.target.value);
    // }
    // const deleteHandler = () => {}

  return (
    <>
    <li>{props.task}</li>
      {/* <section>
        <input type="text" value={val} id="val" placeholder="Add Todo"/>
        <button type="button" onClick={addHandler}>Add</button>
        <button type="button" onClick={deleteHandler}>Delete</button>
      </section>
      <section>
        <ul>
            {
                tasks.map(task=> <li key={task}>{task}</li>)
            }
        </ul>
      </section> */}
    </>
  );
}

export default Todo;
