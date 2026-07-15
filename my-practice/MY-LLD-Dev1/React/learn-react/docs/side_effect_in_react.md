# Side Effects in React

## What is a Side Effect?

A **side effect** is any operation that interacts with something **outside the React rendering process**.

In React, a component's primary job is to:

- Receive props
- Maintain state
- Return JSX

Anything beyond this, such as making an API call or modifying the browser, is considered a **side effect**.

---

# Definition

> A **side effect** is any operation that affects or depends on something outside the component's render function.

Examples include:

- Fetching data from an API
- Updating the document title
- Accessing Local Storage
- Setting up timers
- Listening to browser events
- Manipulating the DOM
- Opening WebSocket connections

---

# Why Are They Called "Side Effects"?

Rendering should be **pure**.

Given the same props and state, a React component should always return the same JSX.

Example of a pure render:

```jsx
function Greeting({ name }) {
  return <h1>Hello {name}</h1>;
}
```

For the same `name`, this component always renders the same output.

Now consider:

```jsx
document.title = "Dashboard";
```

This changes something outside React.

It is a **side effect**.

---

# Common Side Effects

## 1. API Calls

```jsx
fetch("/users")
```

Reason:

- Network request
- Outside React

---

## 2. Timers

```jsx
setInterval(() => {
  console.log("Running");
}, 1000);
```

Reason:

- Browser timer

---

## 3. Event Listeners

```jsx
window.addEventListener("resize", handleResize);
```

Reason:

- Listening to browser events

---

## 4. Local Storage

```jsx
localStorage.setItem("theme", "dark");
```

Reason:

- Reading/writing browser storage

---

## 5. Document Title

```jsx
document.title = "Home";
```

Reason:

- Updates browser tab

---

## 6. WebSocket

```jsx
const socket = new WebSocket(url);
```

Reason:

- Opens external connection

---

# Where Should Side Effects Be Written?

React provides the **`useEffect`** hook.

```jsx
useEffect(() => {
  // Side Effect
}, []);
```

---

# Why Not Inside the Component Body?

Bad example:

```jsx
function App() {
  fetch("/users");

  return <div>Hello</div>;
}
```

Every render triggers another API request.

Example:

```text
Render
 ↓
API Call

State Update
 ↓
Render Again
 ↓
API Call Again

Render Again
 ↓
API Call Again
```

This can lead to repeated requests and poor performance.

---

# Correct Way

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("/users");
  }, []);

  return <div>Hello</div>;
}
```

Now the API call runs only once when the component mounts.

---

# Understanding `useEffect`

Syntax:

```jsx
useEffect(() => {
  // Side Effect

  return () => {
    // Cleanup
  };
}, [dependencies]);
```

It has three parts:

1. Effect function
2. Cleanup function (optional)
3. Dependency array

---

# Example 1: Run Once

```jsx
useEffect(() => {
  console.log("Component Mounted");
}, []);
```

Runs only once after the initial render.

---

# Example 2: Run When State Changes

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  console.log("Count changed");
}, [count]);
```

Runs:

- Initial render
- Every time `count` changes

---

# Example 3: Run on Every Render

```jsx
useEffect(() => {
  console.log("Runs every render");
});
```

No dependency array means the effect runs after every render.

---

# Real-World Example: Fetch Users

```jsx
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

# Real-World Example: Update Document Title

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

Whenever `count` changes, the browser tab title is updated.

---

# Real-World Example: Timer

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => {
    clearInterval(id);
  };
}, []);
```

The cleanup function stops the timer when the component unmounts.

---

# Real-World Example: Window Resize

```jsx
useEffect(() => {
  const handleResize = () => {
    console.log(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

The event listener is removed during cleanup to prevent memory leaks.

---

# What is Cleanup?

Some side effects create resources that should be removed when they are no longer needed.

Examples:

- Timers
- Event listeners
- WebSocket connections
- Subscriptions

Cleanup is returned from `useEffect`.

```jsx
useEffect(() => {
  const id = setInterval(doSomething, 1000);

  return () => {
    clearInterval(id);
  };
}, []);
```

---

# Dependency Array Explained

## Empty Array

```jsx
useEffect(() => {
  console.log("Once");
}, []);
```

Runs only once after the component mounts.

---

## With Dependencies

```jsx
useEffect(() => {
  console.log("Count changed");
}, [count]);
```

Runs when `count` changes.

---

## No Dependency Array

```jsx
useEffect(() => {
  console.log("Every render");
});
```

Runs after every render.

---

# Common Mistakes

## Calling APIs in the Render Body

❌ Incorrect:

```jsx
function App() {
  fetch("/users");

  return <div>Hello</div>;
}
```

Every render triggers a new request.

---

## Forgetting Cleanup

❌ Incorrect:

```jsx
useEffect(() => {
  setInterval(() => {
    console.log("Running");
  }, 1000);
}, []);
```

The interval continues even after the component is removed.

---

## Correct Cleanup

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => clearInterval(id);
}, []);
```

---

# Interview Questions

## 1. What is a side effect in React?

**Answer:**

A side effect is any operation that interacts with something outside the React rendering process, such as API calls, timers, event listeners, local storage, or updating the document title.

---

## 2. Which hook is used to handle side effects?

**Answer:**

`useEffect`.

---

## 3. Why shouldn't side effects be written inside the component body?

**Answer:**

Because the component body executes on every render. Placing side effects there can cause repeated API calls, timers, or event listeners, leading to incorrect behavior and performance issues.

---

## 4. What is the purpose of the cleanup function?

**Answer:**

To remove resources such as timers, event listeners, subscriptions, or WebSocket connections when the component unmounts or before the effect runs again.

---

## 5. When does `useEffect` run?

- Without dependencies → After every render.
- With `[]` → Once after the initial render.
- With `[dependency]` → After the initial render and whenever the dependency changes.

---

# Summary

| Concept | Description |
|---------|-------------|
| Side Effect | Operation outside the React rendering process |
| Hook Used | `useEffect` |
| API Calls | Side Effect |
| Timers | Side Effect |
| Event Listeners | Side Effect |
| Local Storage | Side Effect |
| Document Title | Side Effect |
| Cleanup | Removes timers, listeners, subscriptions, etc. |
| Empty Dependency Array (`[]`) | Runs once after mount |
| Dependency Array (`[value]`) | Runs when dependencies change |
| No Dependency Array | Runs after every render |

---

# Key Takeaway

> **Rule of Thumb:**  
> Keep your component's render function **pure**. Perform operations that interact with the outside world—such as fetching data, updating the browser, or setting up subscriptions—inside `useEffect`, and clean them up when necessary.

