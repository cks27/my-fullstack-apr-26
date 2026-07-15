# React `useReducer` Interview Questions

## 1. What is `useReducer`?

**Answer:**

`useReducer` is a React Hook used for managing complex state. It updates state by dispatching actions to a reducer function.

Syntax:

```jsx
const [state, dispatch] = useReducer(
  reducer,
  initialState
);
```

---

## 2. When should you use `useReducer` instead of `useState`?

**Answer:**

Use `useReducer` when:

- State is complex
- Multiple state values are related
- State transitions depend on previous state
- Multiple actions update the same state
- Building forms, authentication, shopping carts, or multi-step workflows

Use `useState` for simple state like:

- Counter
- Toggle
- Input field
- Modal open/close

---

## 3. What are the arguments passed to `useReducer`?

**Answer:**

```jsx
const [state, dispatch] = useReducer(
    reducer,
    initialState
);
```

Arguments are:

1. Reducer Function
2. Initial State

---

## 4. What does `useReducer` return?

**Answer:**

```jsx
const [state, dispatch] = useReducer(...);
```

Returns:

- `state` → Current state
- `dispatch` → Function to send actions

---

## 5. What is a Reducer?

**Answer:**

A reducer is a **pure function** that receives:

- Current State
- Action

and returns the **next state**.

```jsx
function reducer(state, action) {
    return newState;
}
```

---

## 6. What is `dispatch()`?

**Answer:**

`dispatch()` is a function provided by React.

It sends an **action object** to the reducer.

Example:

```jsx
dispatch({
    type: "increment"
});
```

It does **not** update the state directly.

---

## 7. How does `dispatch()` know which reducer to call?

**Answer:**

When you write:

```jsx
const [state, dispatch] = useReducer(
    reducer,
    initialState
);
```

React stores:

- Reducer function
- Current state

Later, when you call:

```jsx
dispatch({
    type: "increment"
});
```

React internally executes:

```jsx
const newState = reducer(
    currentState,
    action
);
```

You never call the reducer directly.

React does it for you.

---

## 8. Why don't we pass the state to `dispatch()`?

Example:

```jsx
dispatch({
    type:"increment"
});
```

Where is the state?

**Answer:**

React already stores the current state internally.

So React automatically calls:

```jsx
reducer(currentState, action);
```

The developer only sends the action.

---

## 9. What is an Action?

**Answer:**

An action is a plain JavaScript object describing **what happened**.

Example:

```jsx
{
    type:"increment"
}
```

or

```jsx
{
    type:"LOGIN_SUCCESS",
    payload:user
}
```

---

## 10. Why do we use `type`?

**Answer:**

The `type` tells the reducer **which update logic to execute**.

Example:

```jsx
switch(action.type){

case "increment":

case "decrement":

case "reset":

}
```

---

## 11. What is `payload`?

**Answer:**

Payload is additional data sent with the action.

Example:

```jsx
dispatch({
    type:"setName",
    payload:"John"
});
```

Reducer:

```jsx
case "setName":

return {
    ...state,
    name: action.payload
}
```

---

## 12. Why should reducers be pure?

**Answer:**

Reducers should:

- Return new state
- Never modify existing state
- Never call APIs
- Never update DOM
- Never create side effects

Bad:

```jsx
fetch("/users");
```

Good:

```jsx
return {
    count: state.count + 1
}
```

---

## 13. Why shouldn't you mutate the state inside a reducer?

Bad:

```jsx
state.count++;

return state;
```

Good:

```jsx
return {
    ...state,
    count: state.count + 1
};
```

Mutating state can prevent React from detecting changes and lead to bugs.

---

## 14. Why is the spread operator (`...state`) commonly used?

**Answer:**

To preserve the existing state while updating only the required properties.

Example:

```jsx
return {
    ...state,
    age: state.age + 1
};
```

---

## 15. What happens if the reducer doesn't return anything?

Bad:

```jsx
function reducer(state, action){

}
```

React receives:

```text
undefined
```

State becomes invalid.

Reducers must always return a state.

---

## 16. Why do reducers usually have a `default` case?

```jsx
default:
    return state;
```

If an unknown action is dispatched, the current state is returned unchanged.

---

## 17. Explain the complete flow of `useReducer`.

**Answer:**

```text
Component Renders
        │
        ▼

Current State

        │
        ▼

User clicks button

        │
        ▼

dispatch(action)

        │
        ▼

React receives action

        │
        ▼

React calls

reducer(currentState, action)

        │
        ▼

Reducer returns new state

        │
        ▼

React stores new state

        │
        ▼

Component re-renders
```

---

## 18. Is `dispatch()` synchronous?

**Answer:**

No.

Like other React state updates, dispatch schedules a state update. React processes it and then re-renders the component.

---

## 19. Is `dispatch()` similar to `setState()`?

**Answer:**

Yes.

Comparison:

| `useState` | `useReducer` |
|------------|--------------|
| `setState()` | `dispatch()` |
| Directly updates state | Sends an action to the reducer |
| Best for simple state | Best for complex state |

---

## 20. Can one reducer handle multiple actions?

**Answer:**

Yes.

Example:

```jsx
switch(action.type){

case "increment":

case "decrement":

case "reset":

case "login":

case "logout":

}
```

One reducer can manage many state transitions.

---

## 21. Does React call the reducer on every render?

**Answer:**

No.

The reducer is called:

- During initialization (to establish the initial state)
- Whenever you call `dispatch()`

It is **not** called on every render unless a dispatch triggers a state update.

---

## 22. Can you have multiple reducers in one component?

**Answer:**

Yes.

```jsx
const [userState, userDispatch] = useReducer(userReducer, initialUserState);

const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
```

Each reducer manages a different part of the component's state.

---

# Most Asked Interview Question

### Question

**How does `dispatch()` call the reducer without you passing the current state?**

### Answer

When React executes:

```jsx
const [state, dispatch] = useReducer(
    reducer,
    initialState
);
```

React internally stores:

- Current state
- Reducer function

Later, when you call:

```jsx
dispatch({
    type:"increment"
});
```

React internally performs:

```jsx
const newState = reducer(
    currentState,
    action
);
```

Then it:

```text
Stores New State
       ↓
Re-renders Component
```

The developer only provides the **action**. React automatically provides the **current state**.

---

# One-Line Summary

> **`dispatch()` doesn't update the state itself—it tells React what happened. React already knows the current state, calls the reducer with `(currentState, action)`, stores the returned state, and re-renders the component.**