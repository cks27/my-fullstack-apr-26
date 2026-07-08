import { useState } from "react";

function MultiCounter({ index, value }) {
  const [count, setCount] = useState(value || 0);
  const increment = () => {
    setCount(count + index);
  };
  const decrement = () => {
    setCount(count - index);
  };

  return (
    <>
      <div className="counter">
        <h3>Counter Number: {index}</h3>
        <button onClick={decrement}>-</button>
        <div>{count}</div>
        <button onClick={increment}>+</button>
      </div>
    </>
  );
}

export default MultiCounter;
