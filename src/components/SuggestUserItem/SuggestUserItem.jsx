import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import logo from "../../assets/icons/default-avatar.svg";
import styles from "./SuggestUserItem.module.scss";
import Swal from "sweetalert2";
export default function SuggestUserItem({
  avatar,
  name,
  account,
  id,
  isFollowed,
  Follow,
  Unfollow,
}) {
  const [isFollower, setIsFollower] = useState(isFollowed);
  const token = localStorage.getItem("token");
  const handleClick = async () => {
    if (isFollower) {
      const success = await Unfollow(id, token);
      if (success.message === "取消跟隨成功!") {
        setIsFollower(false);
        Swal.fire({
          position: "top",
          title: "取消推薦跟隨成功！",
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } else {
      const success = await Follow(id, token);
      if (success.message === "跟隨成功!") {
        setIsFollower(true);
        Swal.fire({
          position: "top",
          title: "推薦跟隨成功！",
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };
  useEffect(() => {
    setIsFollower(isFollowed);
  }, [isFollowed]);

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <Link to={`/user/${id}`}>
          <img
            className={styles.userAvatar}
            src={avatar || logo}
            alt="avatar"
          />
        </Link>
      </div>
      <div className={styles.userInfo}>
        <Link to={`/user/${id}`}>
          <p className={styles.userInfoName}>{name}</p>
          <p className={styles.userInfoAccount}>@{account}</p>
        </Link>
      </div>
      <div className={styles.btnFollow}>
        {isFollower ? (
          <Button
            title="正在跟隨"
            size="middle"
            onClick={() => handleClick(id)}
            isAction
          />
        ) : (
          <Button title="跟隨" size="small" onClick={() => handleClick(id)} />
        )}
      </div>
    </div>
  );
}
