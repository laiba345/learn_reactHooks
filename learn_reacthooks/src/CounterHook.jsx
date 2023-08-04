import { memo, useState } from "react";

function CounterHooks(props) {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h2>当前计数：{counter}</h2>
      <button onClick={(e) => setCounter(counter+1)}>+1</button>
      <button onClick={(e) => setCounter(counter-1)}>-1</button>
    </div>
  );
}

export default memo(CounterHooks);
