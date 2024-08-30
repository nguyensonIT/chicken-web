import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
// Tạo Context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const decoded = token ? jwtDecode(token) : "";
  const [user, setUser] = useState(decoded || null);
  const [productContext, setProductContext] = useState(null);
  const [inFoProductContext, setInFoProductContext] = useState("");

  //render lại api table
  const handleProductContext = (data) => {
    setProductContext(data);
  };

  const handleTakeInFoBtnProductContext = (data, isActive) => {
    setInFoProductContext({ ...data, isNewActive: isActive });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        productContext,
        inFoProductContext,
        handleProductContext,
        handleTakeInFoBtnProductContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Tạo hook tùy chỉnh để sử dụng context
const useHandleContext = () => useContext(UserContext);

export { UserProvider, useHandleContext };
