import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { AddFollow, UnFollow, getFollower, getFollowing } from "api/follow";

const FollowContext = createContext();

export function useFollow() {
  return useContext(FollowContext);
}

export function FollowProvider({ children }) {
  const token = localStorage.getItem("token");
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const fetchFollowers = useCallback(async () => {
    try {
      const response = await getFollower(token);
      setFollowers(response);
    } catch (error) {
      console.error("追隨者清單失敗", error);
    }
  }, [token]);

  const fetchFollowing = useCallback(async () => {
    try {
      const response = await getFollowing(token);
      setFollowing(response);
    } catch (error) {
      console.error("正在跟隨清單失敗", error);
    }
  }, [token]);

  const followUser = async (id) => {
    try {
      const follow = await AddFollow(token, id);
      fetchFollowers();
      return follow;
    } catch (error) {
      console.error("跟隨失敗", error);
    }
  };

  const unfollowUser = async (id) => {
    try {
      const unfollow = await UnFollow(token, id);
      fetchFollowers();
      return unfollow;
    } catch (error) {
      console.error("取消追蹤失敗", error);
    }
  };

  useEffect(() => {
    fetchFollowers();
    fetchFollowing();
  }, [fetchFollowers, fetchFollowing]);

  return (
    <FollowContext.Provider
      value={{ followers, following, followUser, unfollowUser }}
    >
      {children}
    </FollowContext.Provider>
  );
}
