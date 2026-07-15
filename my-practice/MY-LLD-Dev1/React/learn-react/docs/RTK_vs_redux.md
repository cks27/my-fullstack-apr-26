
# Redux vs Redux Toolkit (RTK)

## Introduction

Many developers think **Redux** and **Redux Toolkit (RTK)** are different state management libraries.

**They are not.**

Redux Toolkit is built **on top of Redux** and is the **official recommended way** to write Redux applications.

Think of it like this:

```
                 Redux Toolkit
                      │
        ┌─────────────┴─────────────┐
        │                           │
        │       Uses Redux          │
        │       Internally          │
        └───────────────────────────┘
```

> **Redux Toolkit doesn't replace Redux. It simplifies Redux.**

---

# What is Redux?

Redux is a **predictable state management library**.

It provides:

- Store
- Reducers
- Actions
- Dispatch

Everything else must be written manually.

---

# Traditional Redux Architecture

```
Component

      │

dispatch(action)

      │

      ▼

Action Creator

      │

      ▼

Action Object

      │

      ▼

Reducer

      │

      ▼

Redux Store

      │

      ▼

React Re-render
```

---

# Example in Traditional Redux

## Step 1 - Action Type

```jsx
export const INCREMENT = "INCREMENT";
```

---

## Step 2 - Action Creator

```jsx
export const increment = () => ({
    type: INCREMENT
});
```

---

## Step 3 - Reducer

```jsx
const initialState = {
    count: 0
};

function counterReducer(state = initialState, action) {

    switch(action.type){

        case INCREMENT:

            return {
                count: state.count + 1
            };

        default:
            return state;
    }
}
```

---

## Step 4 - Store

```jsx
const store = createStore(counterReducer);
```

---

## Total Files

```
actions.js

actionTypes.js

reducers.js

store.js
```

Even for a simple counter.

---

# Problems with Traditional Redux

Lots of boilerplate.

Example

```
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

Writing the same patterns repeatedly.

---

# What is Redux Toolkit?

Redux Toolkit is a package that simplifies Redux.

Instead of creating everything manually,

RTK generates most of it automatically.

---

# Redux Toolkit Architecture

```
React Component

      │

dispatch(action)

      │

      ▼

Slice

      │

      ▼

Redux Store

      │

      ▼

React Re-render
```

Only one Slice replaces:

- Action Types
- Action Creators
- Reducers

---

# Same Counter in RTK

```jsx
const counterSlice = createSlice({

    name:"counter",

    initialState:{
        value:0
    },

    reducers:{

        increment(state){
            state.value++;
        },

        decrement(state){
            state.value--;
        }

    }

});
```

Done.

No action creators.

No action types.

No switch statement.

---

# Internal Comparison

## Traditional Redux

```
Component

↓

dispatch()

↓

Action Creator

↓

Action

↓

Reducer

↓

Store

↓

UI
```

---

## Redux Toolkit

```
Component

↓

dispatch()

↓

Slice

↓

Store

↓

UI
```

Much shorter.

---

# File Structure Comparison

## Redux

```
src

actions

reducers

constants

store

components
```

Many files.

---

## Redux Toolkit

```
src

store

features

    cart

        cartSlice.js

    user

        userSlice.js

components
```

Feature-based organization.

---

# Action Comparison

## Redux

```jsx
export const increment = () => {

    return {

        type:"INCREMENT"

    };

};
```

---

## RTK

Automatically generated.

Simply export:

```jsx
export const {

    increment

} = counterSlice.actions;
```

---

# Reducer Comparison

Redux

```jsx
switch(action.type){

case "increment":

return {

   count: state.count + 1

};

}
```

---

RTK

```jsx
increment(state){

    state.count++;

}
```

Cleaner because of Immer.

---

# Immutable Update

Redux

```jsx
return {

   ...state,

   count: state.count + 1

}
```

---

Redux Toolkit

```jsx
state.count++;
```

Looks mutable.

Actually immutable.

Immer handles it.

---

# Store Configuration

Redux

```jsx
const store = createStore(
    reducer,
    middleware,
    enhancer
);
```

More manual configuration.

---

Redux Toolkit

```jsx
const store = configureStore({

    reducer:{

        counter:counterReducer

    }

});
```

DevTools and common middleware are configured automatically.

---

# Async API Calls

Redux

```
redux-thunk

Middleware

Manual Setup
```

---

RTK

```
createAsyncThunk()
```

Built-in.

---

# Architecture Comparison

## Redux

```
               Component

                    │

             dispatch(action)

                    │

                    ▼

             Action Creator

                    │

                    ▼

               Action Object

                    │

                    ▼

                Reducer

                    │

                    ▼

                Store

                    │

                    ▼

             React Re-render
```

---

## Redux Toolkit

```
               Component

                    │

             dispatch(action)

                    │

                    ▼

                 Slice

                    │

                    ▼

                 Store

                    │

                    ▼

             React Re-render
```

---

# Real World Example

Imagine Flipkart.

Features

```
Authentication

Products

Cart

Wishlist

Orders

Coupons

Notifications
```

---

## Traditional Redux

For Cart

```
cartActions.js

cartActionTypes.js

cartReducer.js

store.js
```

---

## RTK

```
cartSlice.js
```

Everything in one place.

---

# Advantages of Redux

- Full control
- Works everywhere
- Very flexible
- Foundation of RTK

---

# Advantages of Redux Toolkit

- Official recommendation
- Less code
- Easier to learn
- Automatic action creators
- Built-in Immer
- Built-in DevTools support
- Better folder structure
- Built-in async support
- Easier maintenance

---

# Redux vs RTK

| Feature | Redux | Redux Toolkit |
|----------|--------|---------------|
| Library | Redux | Built on top of Redux |
| Boilerplate | High | Very Low |
| Action Types | Manual | Auto-generated |
| Action Creators | Manual | Auto-generated |
| Reducers | Manual | `createSlice()` |
| Store | `createStore()` | `configureStore()` |
| Immutable Updates | Manual | Immer |
| Async Handling | `redux-thunk` setup | `createAsyncThunk()` |
| DevTools | Manual configuration | Enabled by default |
| Learning Curve | Higher | Easier |
| Recommended Today | No | ✅ Yes |

---

# When Should You Use Redux?

Almost never for new projects.

Traditional Redux is mainly useful for:

- Understanding Redux internals
- Maintaining legacy applications
- Interview discussions about Redux fundamentals

---

# When Should You Use Redux Toolkit?

For almost every new React application:

- E-commerce
- Banking
- CRM
- ERP
- Dashboard
- Authentication
- Enterprise applications
- Large-scale applications

---

# Interview Questions

## 1. Is Redux Toolkit different from Redux?

**Answer:**

No.

Redux Toolkit is built on top of Redux and is the official recommended way to write Redux applications.

---

## 2. Why was Redux Toolkit introduced?

To reduce Redux boilerplate and simplify state management.

---

## 3. Does Redux Toolkit use Redux internally?

Yes.

Redux Toolkit uses the Redux core internally while providing a simpler API.

---

## 4. Which should you use in a new project?

Redux Toolkit.

It is the official recommendation from the Redux team.

---

## 5. Can Redux Toolkit applications use Redux DevTools?

Yes.

`configureStore()` enables Redux DevTools automatically in development.

---

# One-Line Summary

> **Redux is the core state management library, while Redux Toolkit is the official, modern abstraction over Redux that reduces boilerplate, simplifies configuration, and provides best practices out of the box.**