import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (next, replace = false) => {
    setMode(next);
    if (replace) {
      history.pop();
    }
    setHistory(prev => [...prev, next]);
  }
  const back = () => {
    if(history.length > 1) {
      history.pop();
      const previous = history[history.length-1];
      setMode(previous);
    }
  }
  return { mode, transition, back };
}

