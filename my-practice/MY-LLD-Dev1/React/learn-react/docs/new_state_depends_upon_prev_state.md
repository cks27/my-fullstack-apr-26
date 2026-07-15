# React Concept: When the New State Depends on the Previous State

One of the most important concepts in React is understanding **how to update state when the new value depends on the previous value**.

React provides **two ways** to update state:

```jsx
// 1. Direct update
setState(newValue);

// 2. Functional update
setState((previousState) => newValue);
```

Whenever your new state is calculated from the **previous state**, you should use the **functional update** form.

---

# Why Does React Provide a Functional Update (callback)?

React does **not** update the state immediately.

State updates are:

- Asynchronous
- Batched (multiple updates may be combined into one render)
- Scheduled by React

Because of this, reading the current state variable immediately after calling `setState` may not give you the latest value.

---

# Example: Counter

Suppose we have:

```jsx
const [count, setCount] = useState(0);
```

---

## Incorrect Approach

```jsx
const increment = () => {
  setCount(count + 1);
};
```

This works for a single update because `count` is read once and incremented.

---

## Problem with Multiple Updates

Suppose you want to increment three times.

```jsx
const incrementThreeTimes = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};
```

### Initial State

```text
count = 0
```

React receives:

```jsx
setCount(1);
setCount(1);
setCount(1);
```

Since all three updates use the same captured value (`count = 0`), React ends up applying the same update repeatedly.

### Result

```text
count = 1
```

**Expected:** `3`

**Actual:** `1`

---

# Correct Approach: Functional Update (aka callback)

Instead, use:

```jsx
const incrementThreeTimes = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
};
```

### How React Processes It

Initial state:

```text
count = 0
```

First update:

```text
prev = 0
return 1
```

Second update:

```text
prev = 1
return 2
```

Third update:

```text
prev = 2
return 3
```

Final value:

```text
count = 3
```

---

# Visual Flow

## Direct Update

```text
count = 0

setCount(count + 1)
      ↓
setCount(1)

setCount(count + 1)
      ↓
setCount(1)

setCount(count + 1)
      ↓
setCount(1)

Final State = 1
```

---

## Functional Update

```text
count = 0

setCount(prev => prev + 1)
            ↓
prev = 0 → 1

setCount(prev => prev + 1)
            ↓
prev = 1 → 2

setCount(prev => prev + 1)
            ↓
prev = 2 → 3

Final State = 3
```

---

# Real-World Example: Like Button

```jsx
const [likes, setLikes] = useState(100);

const handleLike = () => {
  setLikes((prevLikes) => prevLikes + 1);
};
```

Each click increases the latest value, even if multiple updates happen quickly.

---

# Real-World Example: Shopping Cart

```jsx
const [quantity, setQuantity] = useState(1);

const increaseQuantity = () => {
  setQuantity((prevQuantity) => prevQuantity + 1);
};

const decreaseQuantity = () => {
  setQuantity((prevQuantity) => prevQuantity - 1);
};
```

The new quantity always depends on the previous quantity.

---

# Real-World Example: Toggle

```jsx
const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => {
  setIsOpen((prevOpen) => !prevOpen);
};
```

React flips the previous value every time.

---

# Real-World Example: Todo List

```jsx
const [todos, setTodos] = useState([]);

const addTodo = (todo) => {
  setTodos((prevTodos) => [...prevTodos, todo]);
};
```

Here, the new array is created from the previous array.

---

# Real-World Example: Removing an Item

```jsx
const removeTodo = (id) => {
  setTodos((prevTodos) =>
    prevTodos.filter((todo) => todo.id !== id)
  );
};
```

The updated list is derived from the previous list.

---

# Real-World Example: Updating an Object

```jsx
const [user, setUser] = useState({
  name: "John",
  age: 25,
});
```

Increase age:

```jsx
setUser((prevUser) => ({
  ...prevUser,
  age: prevUser.age + 1,
}));
```

This preserves the existing object while updating the `age` field.

---

# Why Functional Updates Are Better

Suppose multiple updates happen quickly:

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

> ✅ React guarantees that each updater function receives the **latest pending state**, even when updates are batched.

---

# When Should You Use Functional Updates?

Use them whenever the **new state depends on the previous state**, such as:

- Incrementing or decrementing counters
- Toggling booleans
- Adding items to arrays
- Removing items from arrays
- Updating objects based on existing values
- Any calculation that uses the current state

---

# When Can You Use a Direct Update?

If the new state does **not** depend on the previous state.

Example:

```jsx
setTheme("dark");
```

or

```jsx
setLoading(true);
```

The new value is fixed and does not require the old state.

---

# Common Mistake

```jsx
const increment = () => {
  setCount(count + 1);
  console.log(count);
};
```

If `count` was `5`:

```text
Button Click
↓
setCount(6)
↓
console.log(count)

Output:
5
```

Why?

Because React schedules the update. The state variable (`count`) is not updated immediately within the same function execution.

---

# Interview Questions

## 1. When should you use the functional form of `setState`?

**Answer:**

Whenever the new state depends on the previous state.

Example:

```jsx
setCount((prev) => prev + 1);
```

---

## 2. Why doesn't this increment by 3?

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

**Answer:**

All three updates use the same captured value of `count`, so React processes them as identical updates.

---

## 3. Why does this work?

```jsx
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
```

**Answer:**

Each updater function receives the latest pending state, so the increments are applied one after another.

---

## 4. Does React immediately update state?

**Answer:**

No.

React schedules state updates and may batch multiple updates together before re-rendering.

---

## 5. Can functional updates be used with arrays and objects?

**Answer:**

Yes.

Examples:

```jsx
setTodos((prev) => [...prev, newTodo]);

setUser((prev) => ({
  ...prev,
  age: prev.age + 1,
}));
```

---

# Summary

| Direct Update | Functional Update |
|---------------|-------------------|
| `setCount(count + 1)` | `setCount((prev) => prev + 1)` |
| Uses the current state variable | Uses the latest pending state provided by React |
| Suitable when the new value does not depend on the previous state | Suitable when the new value depends on the previous state |
| Can produce unexpected results with multiple updates in the same event | Correctly handles multiple queued or batched updates |
| Example: `setLoading(true)` | Example: Incrementing a counter, toggling a boolean, updating arrays or objects |

---

# Key Takeaway

> **Rule of Thumb:**  
> If your new state is calculated from the previous state, always use the functional update form.

```jsx
setState((prevState) => {
  // calculate and return the next state
  return nextState;
});
```

This approach is safe, predictable, and works correctly with React's asynchronous and batched state updates.

