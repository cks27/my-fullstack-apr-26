
# Controlled vs Uncontrolled Components in React

## What is a Controlled Component?

A **controlled component** is an input element whose value is controlled by **React state**.

- React is the **single source of truth**.
- Every change updates the component state using `setState` or `useState`.
- The UI always reflects the current React state.

### Flow

```
User Types
     ↓
onChange Event
     ↓
React State Updates
     ↓
Input Value Re-renders
```

### Example

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h3>Hello {name}</h3>
    </div>
  );
}

export default App;
```

### How it works

1. User types in the input.
2. `onChange` fires.
3. React updates the state.
4. Component re-renders.
5. Updated state is displayed in the input.

---

## Advantages

- Easy validation
- Easy formatting
- Conditional rendering
- Instant UI updates
- Predictable data flow
- Easier debugging

---

## Disadvantages

- Re-render on every keystroke
- Slightly more code
- Can impact performance in very large forms

---

# What is an Uncontrolled Component?

An **uncontrolled component** stores its own data inside the DOM instead of React state.

React accesses the value only when needed using a **ref**.

### Flow

```
User Types
     ↓
Browser DOM Stores Value
     ↓
React Reads Value using Ref
```

### Example

```jsx
import { useRef } from "react";

function App() {
  const inputRef = useRef();

  const handleClick = () => {
    alert(inputRef.current.value);
  };

  return (
    <>
      <input ref={inputRef} />

      <button onClick={handleClick}>
        Submit
      </button>
    </>
  );
}

export default App;
```

### How it works

1. User types.
2. Browser stores the value.
3. React doesn't know about changes.
4. On button click, React reads the value from the DOM.

---

## Advantages

- Less code
- No re-render on every keystroke
- Better performance for simple forms
- Useful with third-party libraries

---

## Disadvantages

- Harder validation
- Harder to keep UI in sync
- Harder to debug
- React is not the source of truth

---

# Comparison

| Feature | Controlled | Uncontrolled |
|----------|------------|--------------|
| Source of Truth | React State | DOM |
| Uses `useState` | ✅ | ❌ |
| Uses `useRef` | Optional | ✅ |
| Re-render on typing | ✅ Yes | ❌ No |
| Validation | Easy | Hard |
| Predictable | High | Lower |
| Debugging | Easy | Hard |
| Performance | Slightly slower | Slightly faster |
| Best For | Complex forms | Simple forms |

---

# Real-world Example

## Login Form

```text
Username
Password
```

Use **Controlled Components** because:

- Validate email
- Show password strength
- Disable button until valid
- Show errors instantly

---

## Search Box

```text
Search Products...
```

Can be **Controlled** because:

- Live filtering
- Auto suggestions
- Debouncing

---

## File Upload

```html
<input type="file">
```

Always **Uncontrolled** because browsers don't allow React to control the selected file for security reasons.

Example:

```jsx
import { useRef } from "react";

function Upload() {
  const fileRef = useRef();

  const upload = () => {
    console.log(fileRef.current.files[0]);
  };

  return (
    <>
      <input type="file" ref={fileRef} />
      <button onClick={upload}>Upload</button>
    </>
  );
}
```

---

# When to Use Which?

### Use Controlled Components when:

- Building forms
- Input validation
- Live search
- Auto complete
- Conditional UI
- Redux/Zustand integration
- Dynamic forms

---

### Use Uncontrolled Components when:

- Simple forms
- File uploads
- Integrating jQuery or third-party libraries
- Performance-sensitive forms with many fields

---

# Interview Questions

### 1. What is the main difference between controlled and uncontrolled components?

**Answer:**

Controlled components store data in React state, while uncontrolled components store data in the DOM.

---

### 2. Which is the source of truth?

- Controlled → React State
- Uncontrolled → DOM

---

### 3. Which hook is commonly used?

Controlled:

```jsx
useState()
```

Uncontrolled:

```jsx
useRef()
```

---

### 4. Which causes re-renders?

Controlled components re-render whenever the state changes.

Uncontrolled components do not re-render while typing.

---

### 5. Which is better?

Neither is universally better.

- Use **Controlled Components** for most React forms because they provide better control, validation, and predictable state management.
- Use **Uncontrolled Components** when simplicity, performance, or browser-managed inputs (such as file uploads) make them a better fit.

---

# Summary

| Controlled | Uncontrolled |
|------------|--------------|
| React controls input | DOM controls input |
| Uses `useState` | Uses `useRef` |
| Re-renders on change | No re-render on typing |
| Easy validation | Hard validation |
| Predictable | Less predictable |
| Best for complex forms | Best for simple forms and file uploads |

