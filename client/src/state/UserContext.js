import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userEmail, setUserEmail] = useState("");
  const [userMatricule, setUserMatricule] = useState("");

  // Retrieve user data from local storage on initial render
  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserMatricule = localStorage.getItem("userMatricule");
    setUserEmail(storedUserEmail || "");
    setUserMatricule(storedUserMatricule || "");
  }, []);

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail, userMatricule, setUserMatricule }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
