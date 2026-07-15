# How `dispatch()` Calls the Reducer Function

Suppose we have:

```jsx
const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
      };

    default:
      return state;
  }
}

const [state, dispatch] = useReducer(
  reducer,
  initialState
);
```

---

# What Does `useReducer()` Return?

```jsx
const [state, dispatch] = useReducer(
  reducer,
  initialState
);
```

React internally stores:

```text
Reducer Function
↓

function reducer(state, action) { ... }

Current State
↓

{
   count: 0
}

Dispatch Function
↓

function dispatch(action) { ... }
```

Notice that **React already knows two things**:

- Current State
- Reducer Function

---

# Step 1 : User Clicks Button

```jsx
<button
  onClick={() =>
    dispatch({
      type: "increment",
    })
  }
>
+
</button>
```

You only pass:

```jsx
dispatch({
    type: "increment"
})
```

Notice:

You are **NOT** passing the state.

Only the action.

---

# Step 2 : React Receives the Action

React internally receives

```text
dispatch(action)
```

Example

```text
action

{
    type: "increment"
}
```

React already has the current state stored.

Current state

```text
{
    count:0
}
```

---

# Step 3 : React Calls Your Reducer

Internally React does something similar to this (conceptually):

```jsx
const newState = reducer(
    currentState,
    action
);
```

which becomes

```jsx
const newState = reducer(
    { count: 0 },
    { type: "increment" }
);
```

Notice:

**React automatically supplies the current state.**

You never pass it yourself.

---

# Step 4 : Reducer Executes

Reducer receives

```jsx
state = {
    count:0
}

action = {
    type:"increment"
}
```

Runs

```jsx
return {
    count: state.count + 1
}
```

Returns

```jsx
{
    count:1
}
```

---

# Step 5 : React Saves the New State

React internally does something like

```jsx
currentState = newState;
```

Now React stores

```text
{
    count:1
}
```

---

# Step 6 : React Re-renders

React renders again

```jsx
<h1>{state.count}</h1>
```

Now

```text
state.count = 1
```

UI becomes

```text
1
```

---

# Complete Flow

```text
Initial State

{
   count:0
}

        │
        ▼

dispatch({
   type:"increment"
})

        │
        ▼

React receives action

        │
        ▼

React already knows

Current State

{
   count:0
}

Reducer Function

function reducer(){}

        │
        ▼

React internally calls

reducer(currentState, action)

        │
        ▼

Reducer returns

{
   count:1
}

        │
        ▼

React stores new state

        │
        ▼

React re-renders UI
```

---

# Think of `dispatch()` Like a Messenger

```text
You

dispatch(action)

        │
        ▼

React

"I already know the current state."

        │
        ▼

React calls

reducer(currentState, action)

        │
        ▼

Reducer returns new state

        │
        ▼

React updates state

        │
        ▼

Component re-renders
```

---

# Analogy

Imagine a bank account.

Current balance

```text
₹1000
```

You don't call

```text
updateBalance(
    currentBalance,
    transaction
)
```

Instead, you submit a request:

```text
Deposit ₹500
```

The bank already knows your current balance.

Internally it performs

```text
newBalance = updateBalance(
    currentBalance,
    transaction
)
```

Similarly,

You only dispatch

```jsx
dispatch({
    type:"increment"
})
```

React already knows

- Current State
- Reducer Function

and internally executes

```jsx
const newState = reducer(
    currentState,
    action
);
```

---

# Internal Pseudo Code (Simplified)

React's implementation is much more sophisticated, but conceptually it works like this:

```jsx
let currentState = initialState;

function dispatch(action) {
  currentState = reducer(currentState, action);

  render();
}
```

So when you write:

```jsx
dispatch({
  type: "increment",
});
```

React effectively performs:

```jsx
currentState = reducer(
  currentState,
  {
    type: "increment",
  }
);

render();
```

---

# Key Takeaway

> **`dispatch()` does not update the state itself.**
>
> It simply sends an **action** to React.
>
> React already has:
>
> - The current state
> - The reducer function
>
> React internally calls:
>
> ```jsx
> reducer(currentState, action)
> ```
>
> The reducer returns a **new state**, React stores it, and then React re-renders the component.