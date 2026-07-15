# Redux Toolkit (RTK)

## What is Redux Toolkit?

**Redux Toolkit (RTK)** is the official, recommended way to write Redux applications.

It simplifies Redux by reducing boilerplate code and providing built-in utilities for common Redux tasks.

> **Redux Toolkit is a wrapper around Redux that makes Redux easier, cleaner, and less error-prone.**

---

# Why Was Redux Toolkit Introduced?

Traditional Redux required writing a lot of repetitive code.

Example:

```text
Action Types
        ↓
Action Creators
        ↓
Reducer
        ↓
Store
        ↓
Dispatch
```

For even a simple counter, you had to create multiple files.

Redux Toolkit reduces all of this.

---

# Traditional Redux vs Redux Toolkit

### Traditional Redux

```text
Action Type
      ↓
Action Creator
      ↓
Reducer
      ↓
Store
      ↓
Dispatch
```

Lots of boilerplate.

---

### Redux Toolkit

```text
Slice
   ↓
Store
   ↓
Dispatch
```

Much simpler.

---

# Why Use Redux Toolkit?

Benefits:

- Less boilerplate
- Easier to learn
- Built-in Immer (write "mutating" logic safely)
- Built-in Redux DevTools support
- Simplified store configuration
- Better TypeScript support
- Built-in async handling (`createAsyncThunk`)

---

# Installation

```bash
npm install @reduxjs/toolkit react-redux
```

---

# Core Concepts

Redux Toolkit mainly uses:

1. Store
2. Slice
3. Reducer
4. Action
5. Dispatch
6. Selector

---

# Architecture

```text
Component
      │
      ▼
dispatch(action)
      │
      ▼
Slice Reducer
      │
      ▼
Redux Store
      │
      ▼
React Re-renders
```

---

# Step 1: Create a Slice

```jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    value: 0,
  },

  reducers: {
    increment(state) {
      state.value++;
    },

    decrement(state) {
      state.value--;
    },

    reset(state) {
      state.value = 0;
    },
  },
});

export default counterSlice.reducer;

export const {
  increment,
  decrement,
  reset,
} = counterSlice.actions;
```

---

# Understanding `createSlice`

```jsx
createSlice({
    name,
    initialState,
    reducers
});
```

---

## name

```jsx
name: "counter"
```

Used to identify the slice.

---

## initialState

```jsx
initialState:{
    value:0
}
```

Initial state for this slice.

---

## reducers

Contains functions that update the state.

```jsx
reducers:{
    increment(){},
    decrement(){}
}
```

---

# Notice Something Interesting

Normally Redux requires:

```jsx
return {
    ...state,
    value: state.value + 1
}
```

In Redux Toolkit you simply write:

```jsx
state.value++;
```

Why?

Because Redux Toolkit uses **Immer** internally.

Immer converts your "mutating" code into immutable updates.

---

# Step 2: Configure Store

```jsx
import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

---

# Step 3: Provide Store

```jsx
import { Provider } from "react-redux";

import { store } from "./store";

root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
```

---

# Step 4: Read State

```jsx
import { useSelector } from "react-redux";

const count = useSelector(
  state => state.counter.value
);
```

`useSelector()` reads data from the Redux store.

---

# Step 5: Update State

```jsx
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

dispatch(increment());
```

---

# Complete Counter Example

```jsx
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  increment,
  decrement,
} from "./counterSlice";

function App() {

  const count = useSelector(
    state => state.counter.value
  );

  const dispatch = useDispatch();

  return (
    <>
      <h1>{count}</h1>

      <button
        onClick={() =>
          dispatch(increment())
        }
      >
        +
      </button>

      <button
        onClick={() =>
          dispatch(decrement())
        }
      >
        -
      </button>
    </>
  );
}
```

---

# What Happens Internally?

User clicks:

```text
+
```

Component executes:

```jsx
dispatch(increment());
```

React Redux sends:

```text
Action
```

Redux Toolkit calls:

```jsx
counterReducer(
    currentState,
    action
);
```

Reducer updates:

```jsx
state.value++;
```

Redux Store stores:

```text
New State
```

React re-renders.

---

# Flow Diagram

```text
User Clicks Button
        │
        ▼

dispatch(increment())

        │
        ▼

Redux Store

        │
        ▼

Counter Reducer

        │
        ▼

New State

        │
        ▼

Store Updated

        │
        ▼

React Re-renders
```

---

# What is `useSelector()`?

Reads state from Redux.

Example:

```jsx
const user = useSelector(
    state => state.user
);
```

Think of it as:

```text
Store
   │
   ▼

Read Data
```

---

# What is `useDispatch()`?

Returns the dispatch function.

Example:

```jsx
const dispatch = useDispatch();
```

Later:

```jsx
dispatch(login());
```

---

# What is an Action?

Redux Toolkit automatically creates action creators.

Example:

```jsx
increment()
```

Returns:

```jsx
{
    type:"counter/increment"
}
```

No need to write action creators manually.

---

# Action Flow

```text
dispatch(increment())

        │
        ▼

Action

{
   type:"counter/increment"
}

        │
        ▼

Reducer

        │
        ▼

New State

        │
        ▼

Store Updated
```

---

# Async Operations

Redux Toolkit provides:

```jsx
createAsyncThunk()
```

Used for:

- API calls
- Authentication
- Fetching users
- Loading products

Example:

```jsx
export const fetchUsers =
createAsyncThunk(
    "users/fetch",
    async () => {
        const response =
        await fetch("/users");

        return response.json();
    }
);
```

---

# Why Immer?

Without Immer:

```jsx
return {
    ...state,
    value: state.value + 1
}
```

With Immer:

```jsx
state.value++;
```

Immer automatically produces an immutable state update.

---

# Redux Toolkit vs Redux

| Redux | Redux Toolkit |
|--------|---------------|
| Lots of boilerplate | Minimal boilerplate |
| Manual actions | Auto-generated actions |
| Manual reducers | `createSlice()` |
| Manual store setup | `configureStore()` |
| Immutable updates written manually | Immer handles immutable updates |
| Harder to learn | Easier to learn |

---

# Redux Toolkit vs Context API

| Context API | Redux Toolkit |
|--------------|---------------|
| Small state | Large application state |
| No DevTools | Redux DevTools |
| No middleware | Middleware support |
| Can cause more re-renders if not structured carefully | Optimized subscriptions with `useSelector` |
| Good for themes and authentication | Good for enterprise applications |

---

# When Should You Use Redux Toolkit?

Use Redux Toolkit when:

- Large applications
- Shared state across many components
- Authentication
- Shopping cart
- Product catalog
- Notifications
- User profile
- Dashboard
- Enterprise applications

---

# Interview Questions

## 1. What is Redux Toolkit?

**Answer:**

Redux Toolkit is the official, recommended way to write Redux applications. It simplifies Redux by reducing boilerplate and providing utilities like `createSlice`, `configureStore`, and `createAsyncThunk`.

---

## 2. Why use Redux Toolkit instead of Redux?

Because it:

- Reduces boilerplate
- Automatically creates actions
- Simplifies reducers
- Uses Immer
- Simplifies store configuration
- Supports Redux DevTools by default

---

## 3. What is a Slice?

A slice is a collection of:

- State
- Reducers
- Auto-generated actions

Created using:

```jsx
createSlice()
```

---

## 4. What does `configureStore()` do?

It creates the Redux store and combines reducers while automatically setting up useful defaults like Redux DevTools.

---

## 5. What is `useSelector()`?

Reads data from the Redux store.

```jsx
const user = useSelector(
    state => state.user
);
```

---

## 6. What is `useDispatch()`?

Returns the dispatch function.

```jsx
const dispatch = useDispatch();
```

---

## 7. Why can we write `state.value++` in Redux Toolkit?

Because Redux Toolkit uses **Immer**, which converts apparent mutations into immutable updates behind the scenes.

---

## 8. What is `createAsyncThunk()` used for?

Handling asynchronous operations such as API requests.

---

## 9. Does Redux Toolkit replace Redux?

No.

Redux Toolkit is built **on top of Redux** and uses the Redux core internally. It is the recommended way to write Redux code today.

---

# Summary

| Concept | Description |
|---------|-------------|
| `createSlice()` | Creates state, reducers, and actions |
| `configureStore()` | Creates the Redux store |
| `useSelector()` | Reads data from the store |
| `useDispatch()` | Sends actions to the store |
| Immer | Enables writing immutable updates with simple mutation-like syntax |
| `createAsyncThunk()` | Handles asynchronous logic |

---

# Key Takeaway

> **Rule of Thumb:**
>
> - Use **Context API** for small, localized shared state (for example, theme or language).
> - Use **Redux Toolkit** for large applications with complex shared state.
>
> Redux Toolkit simplifies Redux by combining state, reducers, and actions into **slices**, automatically generating action creators, and using **Immer** to make immutable updates easier to write.