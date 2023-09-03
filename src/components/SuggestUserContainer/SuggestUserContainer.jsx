import { useState, useEffect } from "react";

import SuggestUserItem from "../SuggestUserItem/SuggestUserItem.jsx";
import { getTopUsers } from "../../api/user.js";
import { AddFollow, UnFollow } from "api/follow.js";
import styles from "./SuggestUserContainer.module.scss";

export default function SuggestUserContainer() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getTopUser = async () => {
      try {
        const data = await getTopUsers();
        if (data) {
          setUsers(data);
        }
      } catch (error) {
        console.log("獲取推薦跟隨失敗", error);
      }
    };
    getTopUser();
  }, []);
  useEffect(() => {}, [users]);
  const handleFollow = async (userId) => {
    try {
      await AddFollow(token, userId); // 传递 token 和 userId
    } catch (error) {
      console.log("跟随失败", error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      console.log(userId, "124");
      await UnFollow(token, userId);
    } catch (error) {
      console.log("取消跟随失败", error);
    }
  };

  const topUserList = users.map((user) => {
    return (
      <SuggestUserItem
        key={user.id}
        avatar={user.avatar}
        name={user.name}
        account={user.account}
        id={user.id}
        isFollowed={user.isFollowed}
        onFollow={handleFollow}
        onUnfollow={handleUnfollow}
      />
    );
  });

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>推薦跟隨</h4>
      <div className={styles.list}>{topUserList}</div>
    </div>
  );
}
