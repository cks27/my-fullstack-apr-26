# React State Updates, Snapshots, and Rendering

This document explains key concepts in React state management, focusing on why state updates do not immediately reflect in local variables (snapshots), how React schedules rendering, and the role of Javascript references in triggering UI updates.

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

## 4. What actually Renders? (Component Rendering vs Browser DOM Painting)

There is a big difference between React executing your JavaScript functions (re-rendering) and the browser updating the visual HTML elements (painting).

### A. JavaScript Re-rendering (Component Scope)
When a state variable changes, React **does not** re-run your entire application. It only runs:
1. **The component that owns the state** (e.g., `TodoList`).
2. **All of its child components recursively** (e.g., all `<Todo />` items inside the list).

Other parts of the application (like sibling or parent components that do not depend on this state) **are not executed at all**. For example, a sibling `<ParentCounter />` or `<Card />` component will not run when `TodoList` state changes.

### B. Browser DOM Painting (Surgical Updates)
Even though React re-runs the JavaScript function for `TodoList` and all of its `<Todo />` children, **it does not reconstruct the entire HTML DOM tree in the browser.**

React's **Virtual DOM** processes this in two steps:
1. **Diffing**: React runs the component and creates a new Virtual DOM tree (a lightweight JavaScript representation of the HTML). It compares it with the previous Virtual DOM tree.
2. **Reconciliation & Commit**: It calculates the exact difference (e.g., *"Only one new `<li>` was added at the bottom of the list"*).
3. **Paint**: React updates **only** that specific `<li>` in the real browser DOM. The rest of the browser's HTML remains completely untouched.

| Action | Scope | What does it do? |
| :--- | :--- | :--- |
| **Component Rendering (JS)** | **Partial** | Only the state-owning component and its nested children re-run their JavaScript code. |
| **Browser DOM Painting (HTML)** | **Surgical** | Only the exact HTML nodes that changed in value or structure are modified on screen. |

---

## 5. Reference Equality and Immutability (Why `[...]` is required)

To understand why we must copy arrays instead of mutating them directly, we must look at how JavaScript handles references.

### A. Primitive Types vs Reference Types in JavaScript
* **Primitives** (Numbers, Strings, Booleans): Stored by value. Comparing them checks their actual values.
* **Objects & Arrays**: Stored by **reference** (a memory address). Comparing them checks if they point to the exact same memory address.

```javascript
// Array created in memory at Address #101
const todos = ["Go to Gym"];

// Creating a variable pointing to the same address:
const copy = todos; 
copy.push("Read Book"); // Mutates the array at Address #101 in-place

console.log(todos === copy); // true (Both still point to Address #101)
```

### B. How React Detects State Changes (`Object.is`)
React uses a shallow comparison called `Object.is()` (similar to `===`) to determine if a state update should trigger a re-render:

$$\text{Does } \text{Object.is}(\text{oldState}, \text{newState}) \text{ return true?}$$

* **If `true` (Same Reference)**: React assumes nothing changed and **skips** re-rendering.
* **If `false` (New Reference)**: React detects the change and **triggers** a re-render.

### C. Why `push()` fails in React
If you mutate an array in-place and pass it to your setter:
```javascript
todos.push(newTodo); // Modifies Address #101
setTodos(todos);     // Passes Address #101
```
React checks:
$$\text{Object.is}(\text{Address \#101}, \text{Address \#101}) \implies \text{true}$$

React assumes no change occurred, and your UI **will not update**, even though the array contents have technically changed.

### D. Why Spread Syntax `[...]` works
By using the spread operator `[...]`, you instruct JavaScript to instantiate a **new array in memory**:
```javascript
// 1. Instantiates a new array at Address #202
// 2. Copies items from #101 into #202
// 3. Appends newTodo to #202
const nextTodos = [...todos, newTodo]; 

setTodos(nextTodos); // Passes Address #202
```
React checks:
$$\text{Object.is}(\text{Address \#101}, \text{Address \#202}) \implies \text{false}$$

React registers a difference in references, schedules a re-render, and the UI immediately updates with your new item.

---

## 6. How to access the updated state immediately

### Method A: Use a local variable (for immediate logic)
If you need to use the updated state inside the same handler, construct the new state in a local variable first:
```javascript
const addTodoHandler = () => {
  const updatedTodos = [...todos, newTodo];

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
