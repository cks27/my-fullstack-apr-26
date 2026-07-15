# React `useReducer` Hook

## What is `useReducer`?

`useReducer` is a React Hook used to manage **complex state logic**.

Instead of updating state directly like `useState`, you **dispatch actions** to a **reducer function**, which determines how the state should change.

Think of it as a simplified version of Redux built into React.

---

# Definition

> `useReducer` is a state management hook that updates state using a reducer function based on dispatched actions.

---

# Why Do We Need `useReducer`?

`useState` works great for simple state.

Example:

```jsx
const [count, setCount] = useState(0);
```

But as your state becomes more complex, you may have multiple related state variables and many update functions.

Example:

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [age, setAge] = useState(25);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

Managing many state variables and update functions can become difficult.

`useReducer` centralizes the update logic in one place.

---

# Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

---

# Parameters

## 1. Reducer Function

Determines how the state changes.

```jsx
function reducer(state, action) {
  // return new state
}
```

---

## 2. Initial State

The initial value of the state.

```jsx
const initialState = {
  count: 0,
};
```

---

# Return Value

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

| Value | Description |
|--------|-------------|
| `state` | Current state |
| `dispatch` | Function used to send actions |

---

# Visual Flow

```text
User Clicks Button
        │
        ▼
dispatch(action)
        │
        ▼
Reducer Function
        │
        ▼
New State Returned
        │
        ▼
React Re-renders
```

---

# Reducer Function

A reducer is a **pure function**.

It receives:

- Current state
- Action

Returns:

- New state

Syntax:

```jsx
function reducer(state, action) {
  return newState;
}
```

---

# Simple Counter Example

```jsx
import { useReducer } from "react";

const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
      };

    case "decrement":
      return {
        count: state.count - 1,
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <>
      <h1>{state.count}</h1>

      <button
        onClick={() =>
          dispatch({ type: "increment" })
        }
      >
        +
      </button>

      <button
        onClick={() =>
          dispatch({ type: "decrement" })
        }
      >
        -
      </button>
    </>
  );
}
```

---

# How It Works

### Initial State

```text
count = 0
```

User clicks:

```text
+
```

React executes:

```jsx
dispatch({
  type: "increment",
});
```

Reducer receives:

```jsx
state = { count: 0 }

action = {
  type: "increment"
}
```

Returns:

```jsx
{
  count: 1,
}
```

React updates the UI.

---

# Understanding the Action Object

An action is a plain JavaScript object describing **what happened**.

Example:

```jsx
dispatch({
  type: "increment",
});
```

Action:

```jsx
{
  type: "increment",
}
```

Another example:

```jsx
dispatch({
  type: "setName",
  payload: "John",
});
```

Action:

```jsx
{
  type: "setName",
  payload: "John",
}
```

---

# Passing Data with `payload`

Reducer:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "setName":
      return {
        ...state,
        name: action.payload,
      };

    default:
      return state;
  }
}
```

Dispatch:

```jsx
dispatch({
  type: "setName",
  payload: "Alice",
});
```

New state:

```jsx
{
  name: "Alice",
}
```

---

# Managing Multiple State Values

```jsx
const initialState = {
  name: "",
  age: 25,
  isLoggedIn: false,
};
```

Reducer:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "setName":
      return {
        ...state,
        name: action.payload,
      };

    case "increaseAge":
      return {
        ...state,
        age: state.age + 1,
      };

    case "login":
      return {
        ...state,
        isLoggedIn: true,
      };

    default:
      return state;
  }
}
```

---

# Why Use `switch`?

It keeps the reducer organized.

```jsx
switch (action.type) {
  case "increment":
  case "decrement":
  case "reset":
}
```

Each action has one place where its update logic is handled.

---

# Reducer Must Be Pure

Correct:

```jsx
function reducer(state, action) {
  return {
    count: state.count + 1,
  };
}
```

Incorrect:

```jsx
function reducer(state, action) {
  fetch("/users");
}
```

Reducers should not perform side effects.

---

# Real-World Example: Shopping Cart

State:

```jsx
{
  cart: [],
}
```

Reducer:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "addProduct":
      return {
        cart: [
          ...state.cart,
          action.payload,
        ],
      };

    default:
      return state;
  }
}
```

Dispatch:

```jsx
dispatch({
  type: "addProduct",
  payload: product,
});
```

---

# Real-World Example: Login

State:

```jsx
{
  loading: false,
  user: null,
  error: null,
}
```

Actions:

```jsx
LOGIN_START

LOGIN_SUCCESS

LOGIN_FAILURE
```

Reducer:

```jsx
switch (action.type) {
  case "LOGIN_START":
    return {
      ...state,
      loading: true,
    };

  case "LOGIN_SUCCESS":
    return {
      loading: false,
      user: action.payload,
      error: null,
    };

  case "LOGIN_FAILURE":
    return {
      loading: false,
      error: action.payload,
      user: null,
    };
}
```

---

# `useState` vs `useReducer`

| Feature | `useState` | `useReducer` |
|----------|------------|--------------|
| Simple state | ✅ Best | Possible |
| Complex state | Less suitable | ✅ Best |
| Multiple related values | Harder | Easier |
| Centralized update logic | ❌ | ✅ |
| Action-based updates | ❌ | ✅ |
| Similar to Redux | ❌ | ✅ |

---

# When Should You Use `useReducer`?

Use `useReducer` when:

- State has multiple related values
- Complex update logic
- Many actions update the same state
- State transitions depend on previous state
- Building forms
- Shopping carts
- Authentication flows
- Wizards or multi-step forms

---

# When Should You Use `useState`?

Use `useState` when:

- Counter
- Toggle
- Input field
- Modal open/close
- Simple boolean values
- Small components

---

# Common Mistakes

## Mutating State

❌ Incorrect:

```jsx
state.count++;

return state;
```

---

## Correct

```jsx
return {
  ...state,
  count: state.count + 1,
};
```

Always return a **new state object**.

---

## Forgetting the Default Case

❌ Incorrect:

```jsx
switch (action.type) {
  case "increment":
    return {...};
}
```

---

## Correct

```jsx
default:
  return state;
```

This ensures unknown actions don't break the reducer.

---

# Interview Questions

## 1. What is `useReducer`?

**Answer:**

A React Hook that manages state using a reducer function and dispatched actions. It is ideal for complex state logic.

---

## 2. What does `dispatch` do?

**Answer:**

`dispatch` sends an action object to the reducer.

Example:

```jsx
dispatch({
  type: "increment",
});
```

---

## 3. What are the arguments of a reducer?

```jsx
(state, action)
```

- `state` → Current state
- `action` → Object describing what happened

---

## 4. What is an action?

An action is a plain JavaScript object.

Example:

```jsx
{
  type: "LOGIN_SUCCESS",
  payload: user,
}
```

---

## 5. Why is `useReducer` better for complex state?

Because:

- All update logic is centralized
- Easier to maintain
- Easier to test
- Easier to scale
- Predictable state transitions

---

# Summary

| Concept | Description |
|---------|-------------|
| `useReducer` | Hook for managing complex state |
| Reducer | Pure function that returns the next state |
| State | Current application state |
| Dispatch | Sends actions to the reducer |
| Action | Object describing what happened |
| `type` | Identifies the action |
| `payload` | Optional data sent with the action |
| Best For | Complex state, forms, authentication, shopping carts |

---

# Key Takeaway

> **Rule of Thumb:**
>
> - Use **`useState`** for simple state.
> - Use **`useReducer`** when state becomes complex or multiple state values are updated through different actions.
>
> Think of `useReducer` as:
>
> ```text
> User Action
>      │
>      ▼
>  dispatch(action)
>      │
>      ▼
>    Reducer
>      │
>      ▼
>  New State
>      │
>      ▼
> React Re-renders
> ```
>
> This pattern keeps your state logic predictable, organized, and easier to maintain.

