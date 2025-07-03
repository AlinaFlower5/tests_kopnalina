import React, { createContext, useState, useContext, useEffect } from "react";

const HistoryContext = createContext(null);

export function HistoryProvider({ children }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const local = localStorage.getItem("testHistory");
    if (local) setHistory(JSON.parse(local));
  }, []);

  const addResult = (result) => {
    setHistory((prev) => {
      const updated = [result, ...prev];
      localStorage.setItem("testHistory", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <HistoryContext.Provider value={{ history, addResult }}>
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  return useContext(HistoryContext);
}
