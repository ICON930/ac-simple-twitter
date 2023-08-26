import { useState, useEffect } from 'react';

import NavContainer from "../../components/NavContainer/NavContainer.jsx";
import Header from "../../components/Header/Header.jsx";
import AdminUserCard from "../../components/AdminUserCard/AdminUserCard.jsx";

import styles from "./AdminUserPage.module.scss";

export default function AdminUserPage () {
  const [users, setUsers] = useState([]);

  const userList = users.map((user) => {
        return (
        <AdminUserCard
            key={user.id}
            avatar={user.avatar}
            name={user.name}
            coverPhoto={user.coverPhoto}
            account={user.account}
            followerCount={user.followerCount}
            followingCount={user.followingCount}
            tweetCount={user.tweetCount}
            likeCount={user.likedCount}
        />
        );
    });


  return (
    <div className={styles.container}>
      <NavContainer page="admin"/>
      <div className={styles.cardContainer}>
        <Header title="使用者列表" />
        <div className={styles.card}>
          {userList}
        </div>
      </div>
    </div>
  )
}