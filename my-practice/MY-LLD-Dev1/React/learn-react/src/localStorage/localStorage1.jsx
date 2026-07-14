import React, { useState } from "react";

const LocalStorage1 = () => {
  // Edit this component
  /***
   * * Do not edit the data-testid attributes.
   * Use key inputValue to store the data in local storage.
   * 
    * Concept: Why do we use useState here, and what benefits does it give?
    * 1. Reactivity (UI Re-renders):
    *    Modifying localStorage does not trigger a React component update.
    *    useState forces React to re-render the component and update the UI in real-time.
    * 2. Performance (Memory Caching):
    *    Reading from localStorage (disk storage) on every single render is slow.
    *    useState acts as an in-memory cache, making subsequent reads instantaneous from RAM.
    * 3. Controlled Component:
    *    Binding the input's value attribute to state (value={inpValue}) makes it
    *    a controlled component, which is the standard, predictable way React manages form inputs.
    * 4. State & Storage Synchronization:
    *    On initial load, we fetch the persisted value from localStorage once.
    *    As the user types, we update the React state (for immediate UI response)
    *    and localStorage (for persistence across reloads) concurrently.
    * */
  const getItem = () => {
    return localStorage.getItem("inputValue") || "";
  }
  const setItem = (val) => {
    localStorage.setItem("inputValue", val);
  }
  const [inpValue, setInpValue] = useState(getItem());
  const handleInput = (event) => {
    setItem(event.target.value);
    setInpValue(event.target.value);
  }
  return (
    <div>
      <h3>Local Storage Example </h3>
      <p>Local storage value is : {inpValue}</p>
      <input data-testid="input-id" type="text" onChange={handleInput} value={inpValue} />
    </div>
  );
};
export default LocalStorage1;
