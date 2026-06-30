import Person from "./components/Person";
import "./App.css";

function App() {
  const todos = ["Go Swimming", "Learn React", "Buy Groceries"];
  const persons = [
    {
      name: "Chintu",
      age: 5,
    },
    {
      name: "Isha",
      age: 7,
    },
    {
      name: "Ruhi",
      age: 8,
    },
  ];
  return (
    <main>
      <div>My React App</div>
      <section className="card-list">
        <Person
          name="Max"
          age={25}
          picture="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXN8ZW58MHx8MHx8fDA%3D"
        />
        <Person name="John" age={35} />
        <Person
          name="Mira"
          age={23}
          picture="https://images.unsplash.com/photo-1597469713783-f7e41499d32c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGluZGlhJTIwZmVtYWxlJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
        />
      </section>
      <section className="todos">
        <h4>Todos</h4>
        <ul>
          {todos.map((todo, idx) => (
            <li key={idx}>{todo}</li>
          ))}
        </ul>
      </section>
      <section className="card-list">
        {persons.map((psn, idx) => (
          <Person key={idx} name={psn.name} age={psn.age} />
        ))}
      </section>
    </main>
  );
}

export default App;
