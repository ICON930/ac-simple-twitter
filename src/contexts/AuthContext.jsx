import { createContext, useState, useContext, useEffect } from "react";

import { login, register } from "../api/auth";
import { adminLogin } from "../api/admin";
import { AddFollow, UnFollow, getFollowing } from "api/follow";
import { getUserInfo } from "api/setting";
import * as jwt from "jsonwebtoken";

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
  addFollow: null,
  unFollow: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const [followingUsers, setFollowingUsers] = useState([]);

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
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
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
        addFollow: async (id) => {
          try {
            const token = localStorage.getItem("token");
            const response = await AddFollow(token, id);
            if (response.message) {
              // 更新追蹤狀態
              const updatedFollowingUsers = followingUsers.map((user) => {
                if (user.id === id) {
                  return { ...user, isFollowed: false }; // 如果被追蹤的使用者的id匹配，將isFollowed設置為false
                }
                return user;
              });
              setFollowingUsers(updatedFollowingUsers);
              return { success: true };
            } else {
              console.log("follow is fail", response);
              return { error: "追蹤失敗" };
            }
          } catch (error) {
            console.log("follow fail", error);
            return { error };
          }
        },
        unFollow: async (id) => {
          try {
            const token = localStorage.getItem("token");
            const response = await UnFollow(token, id);
            if (response.message) {
              // 更新追蹤狀態
              const updatedFollowingUsers = followingUsers.map((user) => {
                if (user.id === id) {
                  return { ...user, isFollowed: true }; // 如果被追蹤的使用者的id匹配，將isFollowed設置為true
                }
                return user;
              });
              setFollowingUsers(updatedFollowingUsers);
              return { success: false };
            }
          } catch (error) {
            console.log("unfollow fail", error);
            return error;
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
