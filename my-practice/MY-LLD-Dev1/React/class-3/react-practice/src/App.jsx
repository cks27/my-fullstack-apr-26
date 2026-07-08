// import Counter from "./Counter";
// import Counters from "./Counters";
import Card from "./Card";
import TodoList from "./TodoList";
import "./App.css";
import ParentCounter from "./ParentCounter";

function App() {
  return (
    <>
      <div>
        <ParentCounter />
        {/* <Counters /> */}
        {/* <Counter initial={0} />
            <Counter initial={10} /> */}
      </div>

      <hr />
      <section className="container">
        <Card
          name="John"
          email="John@gmail.com"
          age="25"
          location="USA"
          picture="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
        />
        <Card
          name="Nina"
          email="nina@gmail.com"
          age="15"
          location="Orlando, USA"
          picture="https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </section>
      <hr />
      <TodoList />
    </>
  );
}

export default App;
