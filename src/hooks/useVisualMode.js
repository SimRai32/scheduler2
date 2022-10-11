import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (next, replace = false) => {
    setMode(next);
    const tempHistory = [...history];
    if (replace) {
      tempHistory.pop();
    }
    setHistory([...tempHistory, next]);
  }

  const back = () => {
    if(history.length > 1) {
      const tempHistory = [...history];
      tempHistory.pop();
      const previous = tempHistory[tempHistory.length-1];
      setHistory([...tempHistory]);
      console.log(previous);
      setMode(previous);
    } 
  }
  return { mode, transition, back };
}

