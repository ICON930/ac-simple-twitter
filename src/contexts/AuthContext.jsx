import { createContext, useState, useContext, useEffect } from "react";

import { login, register } from "../api/auth";
import { adminLogin } from "../api/admin";
import { getFollowing } from "api/follow";
import { getUserInfo } from "api/setting";
import * as jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
const defaultAuthContext = {
  isAuthenticated: false,
  adminAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const [followingUsers, setFollowingUsers] = useState([]);
  const navigate = useNavigate();
  //儲存TOKEN不讓頁面在重新整理時讀不到
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tempPayload = jwt.decode(token);
      console.log("Temp payload:", tempPayload); // 添加這一行
      if (tempPayload) {
        setPayload(tempPayload);
        setIsAuthenticated(true);
        setAdminAuthenticated(true);
      }
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      const fetchFollowingUsers = async () => {
        try {
          const token = localStorage.getItem("token");
          if (payload) {
            // 檢查 payload 是否存在
            const id = payload.id;
            const response = await getFollowing(token, id);
            setFollowingUsers(response);
          }
        } catch (error) {
          console.log("Fetch following users failed", error);
        }
      };

      fetchFollowingUsers();
    }
  }, [isAuthenticated, payload]);

    useEffect(() => {
    if (adminAuthenticated) {
      const fetchFollowingUsers = async () => {
        try {
          const token = localStorage.getItem("token");
          if (payload) {
            // 檢查 payload 是否存在
            const id = payload.id;
            const response = await getFollowing(token, id);
            setFollowingUsers(response);
          }
        } catch (error) {
          console.log("Fetch following users failed", error);
        }
      };

      fetchFollowingUsers();
    }
  }, [adminAuthenticated, payload]);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        adminAuthenticated,
        currentMember: payload && {
          id: payload.id,
          name: payload.name,
          avatar: payload.avatar,
          account: payload.account,
          email: payload.email,
          followingUsers,
          isFollowed: payload.id,
          tweetCount: payload.id,
        },
        register: async (data) => {
          const success = await register({
            account: data.account,
            name: data.name,
            email: data.email,
            password: data.password,
            checkPassword: data.checkPassword,
          });
          return success;
        },
        login: async (data) => {
          const { success, token } = await login({
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
        adminLogin: async (data) => {
          const { success, token } = await adminLogin({
            account: data.account,
            password: data.password,
          });
          const tempPayload = jwt.decode(token);
          if (tempPayload) {
            setPayload(tempPayload);
            setAdminAuthenticated(true);
            localStorage.setItem("token", token);
          } else {
            setPayload(null);
            setAdminAuthenticated(false);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem("token");
          setPayload(null);
          setIsAuthenticated(false);
          setAdminAuthenticated(false);
          navigate("/login");
        },
        getUser: async (id) => {
          try {
            const token = localStorage.getItem("token"); // 或者您也可以在這裡使用您存儲的 token 變數
            const userInfo = await getUserInfo(token, id);
            return userInfo;
          } catch (error) {
            console.log("getUserInfo fail", error);
            return null; // 或者您可以返回一個適當的錯誤狀態
          }
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
