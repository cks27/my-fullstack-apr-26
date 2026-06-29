import { useState } from "react";

function Counter(props) {
  const [count, setCount] = useState(props.initial || 0);

  const incrementHandler = () => {
    setCount(count + 1);
  };
  const decrementHandler = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const resetHandler = () => {
    setCount(props.initial || 0);
  };
  return (
    <>
      <section>
        <p>{count}</p>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler} disabled={count === 0}>Decrement</button>
        <button onClick={resetHandler}>Reset</button>
      </section>
    </>
  );
}

export default Counter;
