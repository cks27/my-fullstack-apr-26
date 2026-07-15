# Immer Library - Complete Guide

## What is Immer?

**Immer** is a JavaScript library that allows you to write code that **looks like it mutates state**, while actually creating a **new immutable state** behind the scenes.

> **Immer lets you write mutable-looking code while preserving immutability.**

Redux Toolkit uses **Immer internally**, which is why you can write code like:

```jsx
state.count++;
```

even though Redux requires immutable updates.

---

# Why Was Immer Created?

In JavaScript, objects and arrays are **mutable**.

Example:

```jsx
const user = {
  name: "John",
};

user.name = "Mike";
```

Now:

```text
user

{
    name:"Mike"
}
```

The original object has changed.

---

# Problem in React & Redux

React expects state updates to be **immutable**.

Bad:

```jsx
state.count++;
```

This changes the existing object.

React may not detect the update correctly, and Redux reducers must never mutate the existing state.

Instead we usually write:

```jsx
return {
  ...state,
  count: state.count + 1,
};
```

Works.

But imagine a deeply nested object.

---

# Without Immer

Suppose state is

```jsx
{
    user:{
        profile:{
            address:{
                city:"Bangalore"
            }
        }
    }
}
```

To update the city:

```jsx
return {

    ...state,

    user:{

        ...state.user,

        profile:{

            ...state.user.profile,

            address:{

                ...state.user.profile.address,

                city:"Mumbai"

            }

        }

    }

}
```

A lot of code.

---

# With Immer

```jsx
state.user.profile.address.city = "Mumbai";
```

That's it.

Immer creates the immutable update for you.

---

# How Immer Works

Immer creates a **draft** (a temporary copy) of your state.

You modify the draft.

Immer compares the draft with the original and produces a **new immutable state**.

---

# Architecture

```
Original State

        │

        ▼

Create Draft

        │

        ▼

Modify Draft

        │

        ▼

Immer Creates

New Immutable State

        │

        ▼

Return New State
```

---

# Visual Example

Original

```text
State

{

    count:0

}
```

Immer creates

```text
Draft

{

    count:0

}
```

You write

```jsx
draft.count++;
```

Draft becomes

```text
{

    count:1

}
```

Immer returns

```text
New State

{

    count:1

}
```

Original state remains unchanged.

---

# Example Without Immer

```jsx
const state = {

    count:0

};

const newState = {

    ...state,

    count: state.count + 1

};
```

Now

```text
state

{
    count:0
}

newState

{
    count:1
}
```

---

# Example With Immer

```jsx
import { produce } from "immer";

const state = {

    count:0

};

const newState = produce(state, draft => {

    draft.count++;

});
```

Result

```text
state

{
    count:0
}

newState

{
    count:1
}
```

Original state never changes.

---

# How `produce()` Works

Syntax

```jsx
produce(
    currentState,
    draft => {

    }
);
```

---

Example

```jsx
const newState = produce(

    state,

    draft => {

        draft.count++;

    }

);
```

Internally

```
Current State

↓

Draft

↓

Modify Draft

↓

Compare Changes

↓

Return New State
```

---

# Arrays Example

Without Immer

```jsx
return {

    ...state,

    items:[
        ...state.items,
        product
    ]

}
```

---

With Immer

```jsx
draft.items.push(product);
```

Much easier.

---

# Object Example

Without Immer

```jsx
return {

    ...state,

    user:{

        ...state.user,

        age:26

    }

}
```

---

With Immer

```jsx
draft.user.age = 26;
```

---

# Nested Object Example

Without Immer

```jsx
return {

    ...state,

    user:{

        ...state.user,

        profile:{

            ...state.user.profile,

            address:{

                ...state.user.profile.address,

                city:"Mumbai"

            }

        }

    }

}
```

---

With Immer

```jsx
draft.user.profile.address.city = "Mumbai";
```

Huge difference.

---

# How Redux Toolkit Uses Immer

Suppose

```jsx
const counterSlice = createSlice({

    reducers:{

        increment(state){

            state.count++;

        }

    }

});
```

Looks like mutation.

Actually

Redux Toolkit internally does something similar to:

```jsx
produce(

    state,

    draft => {

        draft.count++;

    }

);
```

You don't call `produce()` yourself.

Redux Toolkit does it internally.

---

# Internal Flow

```
Reducer

↓

state.count++

↓

Immer

↓

Creates Draft

↓

Updates Draft

↓

Creates New State

↓

Redux Store Updated
```

---

# Real World Example

Shopping Cart

Current

```text
Cart

Laptop
```

User clicks

```
Add Phone
```

Reducer

```jsx
state.items.push(phone);
```

Immer

```
Draft

Laptop

Phone
```

Creates

```
New State

Laptop

Phone
```

Original cart remains untouched.

---

# Why Immutability Matters

React compares object references.

Suppose

```jsx
state === newState
```

If

```
true
```

React thinks

```
Nothing Changed
```

No re-render.

If

```
false
```

React knows

```
State Changed
```

Re-render.

Immer always creates a **new object** when changes are made.

---

# Mutable vs Immutable

## Mutable

```jsx
user.name = "Mike";
```

Original changes.

---

## Immutable

```jsx
const newUser = {

    ...user,

    name:"Mike"

};
```

Original stays the same.

---

## Immer

```jsx
draft.name = "Mike";
```

Looks mutable.

Actually immutable.

---

# Advantages of Immer

- Less code
- Easier to read
- Easier to maintain
- Supports nested objects
- Supports arrays
- Prevents accidental mutations
- Built into Redux Toolkit

---

# Disadvantages

- Small runtime overhead for creating drafts
- Can hide what's happening internally if developers don't understand immutability
- Not necessary for very simple state updates

---

# Real Applications

Immer is commonly used for:

- Shopping carts
- User profiles
- Forms
- Dashboards
- Product catalogs
- Authentication state
- Enterprise applications

Anywhere complex state updates are required.

---

# Interview Questions

## 1. What is Immer?

**Answer:**

Immer is a library that lets you write mutable-looking code while producing immutable state updates.

---

## 2. Why is Immer used in Redux Toolkit?

To simplify immutable state updates.

Instead of:

```jsx
return {

    ...state,

    count: state.count + 1

}
```

You can write:

```jsx
state.count++;
```

---

## 3. Does Immer mutate the original object?

No.

It creates a **draft**, tracks changes, and returns a new immutable object.

---

## 4. What is `produce()`?

The main Immer function.

```jsx
produce(currentState, draft => {
    // modify draft
});
```

It returns a new immutable state.

---

## 5. Can you use Immer without Redux Toolkit?

Yes.

Immer is an independent library and can be used in any JavaScript or React application.

---

## 6. Does Redux Toolkit require you to call `produce()`?

No.

Redux Toolkit calls `produce()` internally whenever you write reducers with `createSlice()`.

---

# Summary

| Concept | Description |
|---------|-------------|
| Immer | Library for immutable state updates using mutable-looking syntax |
| Draft | Temporary copy of the state created by Immer |
| `produce()` | Function that creates a draft and returns a new immutable state |
| Original State | Never modified |
| New State | Returned after applying changes to the draft |
| Used By | Redux Toolkit internally |

---

# Key Takeaway

> **Rule of Thumb:**
>
> Immer allows you to write code like:
>
> ```jsx
> state.items.push(product);
> ```
>
> even though Redux requires immutable updates.
>
> Internally, Immer:
>
> 1. Creates a draft of the current state.
> 2. Tracks all changes made to the draft.
> 3. Produces a brand-new immutable state.
> 4. Leaves the original state unchanged.
>
> This makes complex state updates easier to write while preserving React and Redux's immutability requirements.