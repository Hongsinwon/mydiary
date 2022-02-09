import React, { useState, useEffect } from "react";

// @ts-ignore
const Textview = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`Update :: text ${text}`);
  });
  return <div>{text}</div>;
});

// @ts-ignore
const Countview = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`Update :: text ${count}`);
  });
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>{count}</h2>
        <Countview
          // @ts-ignore
          count={count}
        />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>{text}</h2>
        <Textview
          // @ts-ignore
          text={text}
        />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default OptimizeTest;
