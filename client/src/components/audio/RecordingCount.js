import React, { useState } from "react";
import useInterval from "./useInterval";
import "./style.css";

export default function RecordingCount() {
  const [count, setCount] = useState(0);
  const [delay] = useState(1000);

  useInterval(() => {
    // Your custom logic here
    setCount(count + 1);
  }, delay);

  return <div className="sub-text">{count}</div>;
}
