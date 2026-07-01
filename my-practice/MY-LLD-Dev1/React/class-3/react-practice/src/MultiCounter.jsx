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
    <div>
      <h2>Counter Number: {index}</h2>
      <button onClick={increment}>+</button>
      <p>{count}</p>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default MultiCounter;
