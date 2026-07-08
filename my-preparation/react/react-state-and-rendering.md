# React State Updates, Snapshots, and Rendering

This document explains key concepts in React state management, focusing on why state updates do not immediately reflect in local variables (snapshots) and how React schedules rendering.

---

## 1. The Common Gotcha: `TypeError: state.map is not a function`

A common issue in React is updating state incorrectly, which can overwrite an array state with a single object.

### The Bug
```javascript
const [todos, setTodos] = useState([...]);

const addTodoHandler = () => {
  setTodos(...todos, { id: uuid(), task: inpTask }); // ❌ BUG
};
```

### Why it breaks
In JavaScript, `...todos` spreads the array elements. Passing `...todos` to `setTodos` passes each item as a separate argument to the function:
```javascript
setTodos(todo1, todo2, todo3, newTodo);
```
Since React's state setter only accepts a single argument, it only registers the first argument (`todo1` — which is a single object). The state of `todos` is updated to a single object, and on the next render, calling `todos.map()` fails because objects do not have a `.map()` method.

### The Fix
Wrap the spread array and the new item in square brackets `[]` to form a new array, or use `.concat()`:
```javascript
// Option 1: Spread syntax (recommended)
setTodos([...todos, { id: uuid(), task: inpTask }]);

// Option 2: Concat syntax
setTodos(todos.concat({ id: uuid(), task: inpTask }));
```

---

## 2. Why state doesn't change immediately (Snapshots & Closures)

Even after calling `setTodos(newTodos)`, logging `todos` on the very next line still prints the **old** value:
```javascript
const addTodoHandler = () => {
  setTodos(todos.concat(newTodo));
  console.log(todos); // ❌ Prints the OLD list!
};
```

### The Explanation

### A. Rendering is a Function Call
Every time React renders a component, it simply calls the component function.
```javascript
const TodoList = () => {
  // During this call, React assigns the current state value to this constant
  const [todos, setTodos] = useState([...]); 
  
  const addTodoHandler = () => {
    setTodos(...);
    console.log(todos); // Refers to the constant defined above
  };
}
```
When your component renders:
1. `useState` returns the current state value as a local constant (`todos`).
2. The `addTodoHandler` function is created. Because of **JavaScript Closures**, it binds to the exact `todos` variable created in this specific function call.

### B. State updates are Snapshots
You cannot change the value of the `todos` constant inside the currently executing event handler. 
* Calling `setTodos()` schedules a re-render for the **future**.
* It does **not** modify the local variable `todos` in the currently running function execution.
* The current render is like a **photograph/snapshot**. It represents the state at that specific point in time and is immutable for the duration of that render.

---

## 3. How React Schedules Updates under the Hood

When we say React **"schedules next state to be used on the next function call"**, here is what is actually happening in memory:

```
[User Click] ──> [setTodos() Called] ──> [Update Queued in Fiber] ──> [Function Finishes] ──> [React Triggers Re-render]
                                                                                                        │
                                                                                                        ▼
                                                                                         [useState() returns updated state]
```

### A. React's Internal Memory (The Fiber Node)
React keeps a data structure representing your component (called a **Fiber**) outside of your component function. This structure stores the actual, current value of the state.

### B. Queuing & Batching
When you call `setTodos(newTodos)`:
1. React **does not** stop your code to run the component again immediately.
2. It stores a **pending update** inside its internal memory box:
   `[ Memory Box: oldTodos | Pending Update: newTodos ]`
3. React marks this component as "dirty" (needs a re-render).
4. Your current handler finishes executing its remaining lines of code (including any `console.log`).

This delayed execution allows React to **batch** updates. If you update three different states in a single click handler, React will queue all three updates first and perform **only one re-render** at the end.

### C. The Next Function Call (The Re-render)
Once your event handler has fully finished executing:
1. React's scheduler triggers a re-render, calling your component function (`TodoList()`) again.
2. Inside this new execution, `useState` runs.
3. `useState` looks at its internal memory box, sees the **Pending Update** (`newTodos`), promotes it to be the current state, and discards the pending flag:
   `[ Memory Box: newTodos ]`
4. `useState` returns `newTodos` as the local `todos` variable for this render.
5. The component returns updated JSX, and React updates the real DOM.

---

## 4. How to access the updated state immediately

### Method A: Use a local variable (for immediate logic)
If you need to use the updated state inside the same handler, construct the new state in a local variable first:
```javascript
const addTodoHandler = () => {
  const updatedTodos = todos.concat({
    id: uuid(),
    task: inpTask,
  });

  setTodos(updatedTodos);
  console.log(updatedTodos); // Correctly prints the new array immediately!
};
```

### Method B: Use `useEffect` (to react to state changes)
If you want to run side effects (like logging, API calls, or saving to localStorage) whenever `todos` updates:
```javascript
import { useEffect } from "react";

useEffect(() => {
  console.log("Todos state has updated to:", todos);
}, [todos]); // Runs every time `todos` changes
```
