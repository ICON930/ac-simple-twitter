import { useState, useEffect } from "react";

import SuggestUserItem from "../SuggestUserItem/SuggestUserItem.jsx";
import { getTopUsers } from "../../api/user.js";

import styles from "./SuggestUserContainer.module.scss";

export default function SuggestUserContainer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getTopUser = async () => {
      try {
        const data = await getTopUsers();
        if (data) {
          setUsers(data);
        }
      } catch (error) {
        console.log("獲取推文失敗", error);
      }
    };
    getTopUser();
  }, []);

  const topUserList = users.map((user) => {
    return (
      <SuggestUserItem
        key={user.id}
        avatar={user.avatar}
        name={user.name}
        account={user.account}
        id={user.id}
        isFollowed={user.isFollowed}
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
