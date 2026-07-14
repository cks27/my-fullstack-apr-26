import "./App.css";
import Todo from "./todo/Todo";
import { LocalStorage1 } from "./localStorage";

function App() {
  return (
    <div className="App">
      <Todo />
      <hr />
      <LocalStorage1 />
    </div>
  );
}

export default App;
