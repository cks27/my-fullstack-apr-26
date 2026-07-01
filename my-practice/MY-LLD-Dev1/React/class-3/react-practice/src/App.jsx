// import Counter from "./Counter";
// import Counters from "./Counters";
import Card from "./Card";
import Todo from "./Todo";
import "./App.css"
import ParentCounter from "./ParentCounter";

function App() {
 
  return (
    <>
    <ParentCounter />
    {/* <Counters /> */}
     {/* <Counter initial={0} />
     <Counter initial={10} /> */}
     <Card 
      name="John"
      email="John@gmail.com"
      age="25"
      location="USA"
      picture="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
     />
     <Todo />
    </>
  );
}

export default App;
