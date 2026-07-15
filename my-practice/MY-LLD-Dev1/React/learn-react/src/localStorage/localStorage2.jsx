import React, { useState } from "react";

/*
 * Summary of the Issue and Solution:
 * 
 * - Why the input was locked:
 *   In React, binding <input value={value} /> creates a controlled input component.
 *   Because the previous useLocalStorage implementation did not use React state (useState)
 *   to trigger a component re-render when calling setValue, React was never notified
 *   of the change. Consequently, the component did not re-render and the input value
 *   remained static.
 * 
 * - Solution:
 *   We integrated React's useState hook inside useLocalStorage. Now, whenever setValue
 *   is called, it updates the state (which triggers a React re-render of the component)
 *   and synchronizes the value to localStorage.
 * 
 * Concept: Why do we use useState here, and what benefits does it give?
 * 
 * 1. Reactivity (UI Re-renders):
 *    Modifying localStorage does not trigger a React component update.
 *    useState forces React to re-render the component and update the UI in real-time.
 * 
 * 2. Performance (Memory Caching):
 *    Reading from localStorage (disk storage) on every single render is slow.
 *    useState acts as an in-memory cache, making subsequent reads instantaneous from RAM.
 * 
 * 3. Controlled Component:
 *    Binding the input's value attribute to state (value={value}) makes it
 *    a controlled component, which is the standard, predictable way React manages form inputs.
 * 
 * 4. State & Storage Synchronization:
 *    On initial load, we fetch the persisted value from localStorage once.
 *    As the user types, we update the React state (for immediate UI response)
 *    and localStorage (for persistence across reloads) concurrently.
 */
// custom local storage
export const useLocalStorage = (key, initialValue) => {
  // 1. Initialize state with value from localStorage or fallback to initialValue
  const [value, setStoredValue] = useState(localStorage.getItem(key) || initialValue);

  // 2. Return a setter that updates state (to trigger re-render) and localStorage (for persistence)
  const setValue = (val) => {
    const valueToStore = val !== undefined ? val : initialValue;
    localStorage.setItem(key, valueToStore);
    setStoredValue(valueToStore);
  };

  return {
    value,
    setValue
  };
};

const LocalStorage2 = () => {
  const { value, setValue } = useLocalStorage("inputValue", "");

  const handleChange = (e) => {
    setValue(e.target.value);

  };

  return (
    <div>
      <h3>Local Storage Example (Custom Hook) </h3>
      <p>Custom hook local storage value is : {value}</p>
      <input data-testid="input-id" type="text" value={value} onChange={handleChange} />
    </div>
  );
};

export default LocalStorage2;
