# React Component Lifecycle

## What is the Component Lifecycle?

A **React component lifecycle** is the sequence of stages a component goes through from the time it is created until it is removed from the DOM.

Think of it like the lifecycle of a person:

```text
Birth
   ↓
Grow
   ↓
Live
   ↓
Die
```

Similarly, a React component goes through these phases:

```text
Mount
   ↓
Update
   ↓
Unmount
```

---

# The Three Lifecycle Phases

```text
        Component Created
               │
               ▼
        ┌─────────────┐
        │   Mounting  │
        └─────────────┘
               │
               ▼
      User Interaction
      State Changes
      Props Changes
               │
               ▼
        ┌─────────────┐
        │   Updating  │
        └─────────────┘
               │
               ▼
      Component Removed
               │
               ▼
        ┌─────────────┐
        │ Unmounting  │
        └─────────────┘
```

---

# 1. Mounting Phase

## Definition

Mounting is the process of:

- Creating the component
- Rendering it
- Adding it to the DOM

Example:

```jsx
<App />
```

React creates the component and displays it on the screen.

---

## What Happens During Mounting?

```text
Component Created
        ↓
Render JSX
        ↓
DOM Updated
        ↓
useEffect Runs
```

---

## Example

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("Component Mounted");
  }, []);

  return <h1>Hello React</h1>;
}
```

Console:

```text
Component Mounted
```

Since the dependency array is empty (`[]`), the effect runs only once after the component is mounted.

---

## Real-World Example

Fetching user data when the page first loads:

```jsx
useEffect(() => {
  fetch("/users");
}, []);
```

This API call runs only once after the component is mounted.

---

# 2. Updating Phase

## Definition

Updating occurs whenever the component needs to re-render because of:

- State changes
- Props changes
- Parent component re-render

---

## Updating Flow

```text
State Changes
      │
      ▼
Component Re-renders
      │
      ▼
DOM Updates
      │
      ▼
useEffect Executes
```

---

## Example

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  console.log("Count changed");
}, [count]);
```

Whenever `count` changes, the effect runs again.

---

## Real-World Example

```jsx
document.title = `Count: ${count}`;
```

Whenever the counter changes:

```text
User Clicks Button
        ↓
State Changes
        ↓
Component Re-renders
        ↓
Document Title Updates
```

---

# 3. Unmounting Phase

## Definition

Unmounting happens when React removes a component from the DOM.

Example:

```jsx
{
  show && <Profile />
}
```

If:

```jsx
show = false;
```

React removes the `Profile` component.

---

## Unmount Flow

```text
Component Exists
      │
      ▼
Component Removed
      │
      ▼
Cleanup Runs
```

---

## Example

```jsx
useEffect(() => {
  console.log("Mounted");

  return () => {
    console.log("Unmounted");
  };
}, []);
```

Console:

```text
Mounted
Unmounted
```

The cleanup function runs just before the component is removed from the DOM.

---

## Real-World Example

Stopping a timer:

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("Running...");
  }, 1000);

  return () => clearInterval(id);
}, []);
```

Without cleanup, the timer would continue running even after the component is removed.

---

# Complete Lifecycle Example

```jsx
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Mounted");

    return () => {
      console.log("Unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("Count Updated");
  }, [count]);

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}
```

Output:

Initial render:

```text
Mounted
Count Updated
```

Click button:

```text
Count Updated
```

Component removed:

```text
Unmounted
```

---

# Lifecycle in Class Components

Before Hooks, lifecycle methods were implemented using class methods.

| Lifecycle Phase | Class Component Method |
|-----------------|------------------------|
| Mounting | `componentDidMount()` |
| Updating | `componentDidUpdate()` |
| Unmounting | `componentWillUnmount()` |

Example:

```jsx
class App extends React.Component {
  componentDidMount() {
    console.log("Mounted");
  }

  componentDidUpdate() {
    console.log("Updated");
  }

  componentWillUnmount() {
    console.log("Unmounted");
  }

  render() {
    return <h1>Hello</h1>;
  }
}
```

---

# Lifecycle in Functional Components

React uses `useEffect` to handle lifecycle behavior.

### Mount

```jsx
useEffect(() => {
  console.log("Mounted");
}, []);
```

---

### Update

```jsx
useEffect(() => {
  console.log("Updated");
}, [count]);
```

---

### Unmount

```jsx
useEffect(() => {
  return () => {
    console.log("Unmounted");
  };
}, []);
```

---

# How `useEffect` Maps to Lifecycle Phases

| `useEffect` Pattern | Lifecycle Phase |
|---------------------|-----------------|
| `useEffect(() => {}, [])` | Mount |
| `useEffect(() => {}, [dependency])` | Update when dependency changes |
| `useEffect(() => { return cleanup; }, [])` | Cleanup on Unmount |
| `useEffect(() => {})` | Runs after every render |

---

# Real-World Examples

## API Call

```jsx
useEffect(() => {
  fetch("/users");
}, []);
```

Lifecycle:

```text
Mount
   ↓
Fetch Users
```

---

## Search

```jsx
useEffect(() => {
  searchProducts(searchText);
}, [searchText]);
```

Lifecycle:

```text
Search Text Changes
        ↓
API Called
```

---

## Timer

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => clearInterval(id);
}, []);
```

Lifecycle:

```text
Mount
   ↓
Timer Starts
   ↓
Unmount
   ↓
Timer Stops
```

---

## Window Resize

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

Lifecycle:

```text
Mount
   ↓
Add Event Listener
   ↓
Unmount
   ↓
Remove Event Listener
```

---

# Interview Questions

## 1. What are the lifecycle phases of a React component?

**Answer:**

1. Mounting
2. Updating
3. Unmounting

---

## 2. Which hook is used to handle lifecycle methods in functional components?

**Answer:**

`useEffect`.

---

## 3. When does `useEffect(() => {}, [])` run?

**Answer:**

Once after the component is mounted.

---

## 4. When does the cleanup function run?

**Answer:**

- Before the component unmounts.
- Before the effect runs again if its dependencies have changed.

---

## 5. Which lifecycle methods are available in class components?

**Answer:**

- `componentDidMount()`
- `componentDidUpdate()`
- `componentWillUnmount()`

---

# Summary

| Phase | Description | Functional Component | Class Component |
|--------|-------------|----------------------|-----------------|
| Mounting | Component is created and added to the DOM | `useEffect(() => {}, [])` | `componentDidMount()` |
| Updating | Component re-renders because of state or props changes | `useEffect(() => {}, [dependency])` | `componentDidUpdate()` |
| Unmounting | Component is removed from the DOM | Cleanup function returned from `useEffect` | `componentWillUnmount()` |

---

# Key Takeaway

> **Rule of Thumb:**
>
> - **Mount** → Initialize resources (fetch data, start timers, add event listeners).
> - **Update** → Respond to changes in props or state.
> - **Unmount** → Clean up resources (clear timers, remove event listeners, close subscriptions) to avoid memory leaks.

