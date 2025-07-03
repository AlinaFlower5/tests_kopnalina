import React, { createContext, useState, useContext, useEffect } from "react";
import { getMe } from "../api";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      setToken(jwt);
      getMe(jwt)
        .then(setUser)
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
