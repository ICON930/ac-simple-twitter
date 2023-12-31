import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext.jsx";

import NavContainer from "../../components/NavContainer/NavContainer.jsx";
import Header from "../../components/Header/Header.jsx";
import AdminUserCard from "../../components/AdminUserCard/AdminUserCard.jsx";
import { adminGetAllUsers } from "../../api/admin.js";

import styles from "./AdminUserPage.module.scss";

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  const { adminAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const adminGetAllUser = async () => {
      try {
        const data = await adminGetAllUsers();
        if (data.status === "error") {
          console.log(data.message);
          return;
        }
        if (data) {
          setUsers(data);
        }
      } catch (error) {
        console.log("獲取使用者失敗", error);
      }
    };
    adminGetAllUser();
  }, []);

  const userList = users.map((user) => {
    return (
      <AdminUserCard
        key={user.id}
        avatar={user.avatar}
        name={user.name}
        cover={user.cover}
        account={user.account}
        followerAmount={user.followerAmount}
        followingAmount={user.followingAmount}
        tweetsAmount={user.tweetsAmount}
        likedAmount={user.likedAmount}
        role={user.role}
      />
    );
  });

  useEffect(() => {
    if (!adminAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate, adminAuthenticated]);

  return (
    <div className={styles.container}>
      <NavContainer page="admin" />
      <div className={styles.cardContainer}>
        <Header title="使用者列表" />
        <div className={styles.card}>{userList}</div>
      </div>
    </div>
  );
}
