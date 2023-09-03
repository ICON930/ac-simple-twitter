import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import logo from "../../assets/icons/default-avatar.svg";
import styles from "./SuggestUserItem.module.scss";

export default function SuggestUserItem({
  avatar,
  name,
  account,
  id,
  isFollowed,
  onFollow,
  onUnfollow,
}) {
  const handleFollow = async () => {
    if (isFollowed) {
      await onFollow(id);
    } else {
      await onUnfollow(id);
    }
  };
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
      <div className={styles.btnFollow} onClick={handleFollow}>
        {isFollowed ? (
          <Button title="正在跟隨" size="middle" isAction />
        ) : (
          <Button title="跟隨" size="small" />
        )}
      </div>
    </div>
  );
}
// const [isClicked, setIsClicked] = useState(false);

// const handleClick = () => {
//   if (isClicked === false) {
//     setIsClicked(true);
//   } else {
//     setIsClicked(false);
//   }
// };
