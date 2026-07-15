# Pure Functions in JavaScript (and React)

## What is a Pure Function?

A **pure function** is a function that satisfies **two rules**:

1. **For the same input, it always returns the same output.**
2. **It does not produce any side effects.**

> A pure function depends only on its input parameters and does not modify anything outside of itself.

---

# Rule 1: Same Input → Same Output

A pure function always produces the same result for the same arguments.

Example:

```jsx
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5
```

No matter how many times you call it:

```text
Input: (2,3)
Output: 5
```

Always.

---

# Rule 2: No Side Effects

A pure function should not:

- Change global variables
- Modify DOM
- Make API calls
- Update localStorage
- Change input objects
- Read random values
- Read current time

Instead, it should only compute and return a value.

---

# Visual Representation

```text
        Input
          │
          ▼
    Pure Function
          │
          ▼
       Output

Nothing else changes.
```

---

# Example of a Pure Function

```jsx
function multiply(a, b) {
  return a * b;
}
```

Characteristics:

- Same input → Same output
- Doesn't modify anything
- Doesn't depend on external data

---

# Example of an Impure Function

```jsx
let total = 0;

function add(price) {
  total += price;
}
```

Problem:

```text
Global Variable Changes
```

Output depends on previous calls.

---

# Another Impure Function

```jsx
function getRandom() {
  return Math.random();
}
```

Output:

```text
0.35
0.81
0.17
0.59
```

Same function.

Different outputs.

Not pure.

---

# Another Impure Function

```jsx
function getTime() {
  return Date.now();
}
```

Every call returns a different value.

---

# Another Impure Function

```jsx
function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
```

Problem:

It changes browser storage.

That's a side effect.

---

# Pure vs Impure

## Pure

```jsx
function square(x) {
  return x * x;
}
```

---

## Impure

```jsx
let count = 0;

function increment() {
  count++;
}
```

Changes external state.

---

# Objects and Pure Functions

Consider:

```jsx
const person = {
  name: "John",
};
```

---

## Incorrect

```jsx
function updateName(person) {
  person.name = "Mike";
}
```

Problem:

Original object changes.

---

## Correct

```jsx
function updateName(person) {
  return {
    ...person,
    name: "Mike",
  };
}
```

Original object remains unchanged.

---

# Arrays and Pure Functions

## Incorrect

```jsx
function addItem(arr, item) {
  arr.push(item);
}
```

`push()` mutates the original array.

---

## Correct

```jsx
function addItem(arr, item) {
  return [...arr, item];
}
```

Returns a new array.

Original remains unchanged.

---

# Why Are Pure Functions Important?

Benefits:

- Predictable
- Easy to test
- Easy to debug
- Reusable
- No hidden bugs
- No unexpected behavior

---

# Pure Functions in React

React components should behave like pure functions.

Given the same:

- Props
- State

They should return the same JSX.

Example:

```jsx
function Greeting({ name }) {
  return <h1>Hello {name}</h1>;
}
```

Input:

```text
name = "John"
```

Output:

```html
<h1>Hello John</h1>
```

Always.

---

# Bad React Component

```jsx
function Greeting() {
  document.title = "Hello";

  return <h1>Hello</h1>;
}
```

Problem:

It updates the browser title during rendering.

That's a side effect.

---

# Correct React Component

```jsx
function Greeting() {
  useEffect(() => {
    document.title = "Hello";
  }, []);

  return <h1>Hello</h1>;
}
```

Rendering stays pure, while the side effect is handled in `useEffect`.

---

# Real-World Examples

## Price Calculation

```jsx
function calculateTotal(price, tax) {
  return price + tax;
}
```

Pure.

---

## Discount

```jsx
function applyDiscount(price, discount) {
  return price - discount;
}
```

Pure.

---

## Shopping Cart

```jsx
function addProduct(cart, product) {
  return [...cart, product];
}
```

Pure.

---

## Remove Product

```jsx
function removeProduct(cart, id) {
  return cart.filter(product => product.id !== id);
}
```

Pure.

---

## Update Quantity

```jsx
function updateQuantity(cart, id) {
  return cart.map(product =>
    product.id === id
      ? { ...product, quantity: product.quantity + 1 }
      : product
  );
}
```

Pure.

---

# Common Side Effects

These make a function **impure**:

- API calls
- `fetch()`
- `console.log()` *(often considered a side effect, though acceptable for debugging)*
- `Math.random()`
- `Date.now()`
- DOM manipulation
- Local storage
- Session storage
- Cookies
- Global variables
- Modifying input objects or arrays

---

# Interview Questions

## 1. What is a pure function?

**Answer:**

A pure function always returns the same output for the same input and does not cause any side effects.

---

## 2. What are the two rules of a pure function?

1. Same input → Same output
2. No side effects

---

## 3. Why are pure functions preferred?

Because they are:

- Predictable
- Easier to test
- Easier to debug
- Easier to maintain
- Free from unexpected state changes

---

## 4. Is `Math.random()` a pure function?

No.

It returns different values every time.

---

## 5. Is this function pure?

```jsx
function add(a, b) {
  return a + b;
}
```

Yes.

---

## 6. Is this function pure?

```jsx
let total = 0;

function add(price) {
  total += price;
}
```

No.

It modifies external state.

---

# Summary

| Pure Function | Impure Function |
|---------------|-----------------|
| Same input → Same output | Output may vary for the same input |
| No side effects | Produces side effects |
| Doesn't modify external state | Modifies external state |
| Doesn't mutate inputs | May mutate inputs |
| Easy to test | Harder to test |
| Predictable | Less predictable |

---

# Key Takeaway

> **Rule of Thumb:**
>
> A function is **pure** if it:
>
> - Depends only on its input arguments.
> - Always returns the same output for the same input.
> - Does not modify external state or produce side effects.
>
> In React, keep your component's **render logic pure** and move side effects (such as API calls, timers, or DOM updates) into `useEffect`.

