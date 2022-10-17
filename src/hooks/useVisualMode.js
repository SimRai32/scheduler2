import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // updates the mode with the next argument and adds it into the history array if replace = false
  const transition = (next, replace = false) => {
    const tempHistory = [...history];
    // checks if the next argument should replace the last element in the history array
    if (replace) {
      tempHistory.pop();
    }
    tempHistory.push(next);
    setHistory([...tempHistory]);
    
    setMode(next);
  }

  // Sets the mode to the penultimate element of the history array
  const back = () => {
    if(history.length > 1) {
      const tempHistory = [...history];
      // getting rid of the last element in the history array
      tempHistory.pop();
      const previous = tempHistory[tempHistory.length-1];
      setHistory([...tempHistory]);
      setMode(previous);
    } 
  }
  return { mode, transition, back };
}

