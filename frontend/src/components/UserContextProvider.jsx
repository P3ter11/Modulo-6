import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {

  const [nameData, setNameData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() =>{
    setAuthenticated(token!=="");
  }, [token]);


  const value = {
    nameData,
    setNameData,
    token,
    setToken,
    authenticated
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};