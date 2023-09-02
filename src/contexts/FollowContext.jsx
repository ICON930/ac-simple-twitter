import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { AddFollow, UnFollow, getFollower, getFollowing } from "api/follow";
import { useAuth } from "./AuthContext";

const FollowContext = createContext();

export function useFollow() {
  return useContext(FollowContext);
}

export function FollowProvider({ children }) {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { userToken } = useAuth();

  const fetchFollowers = useCallback(async () => {
    try {
      const response = await getFollower(userToken);
      setFollowers(response);
    } catch (error) {
      console.error("追隨者清單失敗", error);
    }
  }, [userToken]);

  const fetchFollowing = useCallback(async () => {
    try {
      const response = await getFollowing(userToken);
      setFollowing(response);
    } catch (error) {
      console.error("正在跟隨清單失敗", error);
    }
  }, [userToken]);

  const followUser = async (userId) => {
    try {
      await AddFollow(userToken, userId);
      fetchFollowers();
    } catch (error) {
      console.error("跟隨失敗", error);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      await UnFollow(userToken, userId);
      fetchFollowers();
    } catch (error) {
      console.error("取消追蹤失敗", error);
    }
  };

  useEffect(() => {
    fetchFollowers();
    fetchFollowing();
  }, [fetchFollowers, fetchFollowing]); // 添加依赖项

  return (
    <FollowContext.Provider
      value={{ followers, following, followUser, unfollowUser }}
    >
      {children}
    </FollowContext.Provider>
  );
}
