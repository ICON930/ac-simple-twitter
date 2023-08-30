import { createContext, useState, useContext, useEffect } from "react";

import { login, register } from "../api/auth";
import { adminLogin } from "../api/admin";
import * as jwt from "jsonwebtoken";

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);

  //儲存TOKEN不讓頁面在重新整理時讀不到
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tempPayload = jwt.decode(token);
      console.log("Temp payload:", tempPayload); // 添加這一行
      if (tempPayload) {
        setPayload(tempPayload);
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.id,
          name: payload.name,
          avatar: payload.avatar,
        },
        register: async (data) => {
          const { success, token } = await register({
            account: data.account,
            name: data.name,
            email: data.email,
            password: data.password,
            checkPassword: data.checkPassword,
          });
          const tempPayload = jwt.decode(token);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        login: async (data) => {
          const loginFunc = data.role === "admin" ? adminLogin : login;
          const { success, token } = await loginFunc({
            account: data.account,
            password: data.password,
          });
          const tempPayload = jwt.decode(token);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem("token");
          setPayload(null);
          setIsAuthenticated(false);
        },
        updateCurrentMember: (updatedFields) => {
          setPayload((prevPayload) => ({ ...prevPayload, ...updatedFields }));
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
