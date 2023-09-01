import styles from "./FollowerList.module.scss";
import Button from "components/Button/Button";
import Avatar from "../../assets/icons/default-avatar.svg";
import { useState } from "react";
export function FollowerList({ avatar, name, introduction }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <img src={avatar || Avatar} alt="avatar" />
          </div>
          <div className={styles.followerName}>{name}</div>
          <div className={styles.button}>
            {isFollowing ? (
              <Button title="追隨中" size="small" onClick={handleClick} />
            ) : (
              <Button
                title="正在跟隨"
                size="middle"
                onClick={handleClick}
                isAction
              />
            )}
          </div>
        </div>
        <div className={styles.introduction}>{introduction}</div>
      </div>
    </div>
  );
}
export function FollowingList({ avatar, name, introduction }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <img src={avatar || Avatar} alt="avatar" />
          </div>
          <div className={styles.followerName}>{name}</div>
          <div className={styles.button}>
            {isFollowing ? (
              <Button title="追隨中" size="small" onClick={handleClick} />
            ) : (
              <Button
                title="正在跟隨"
                size="middle"
                onClick={handleClick}
                isAction
              />
            )}
          </div>
        </div>
        <div className={styles.introduction}>{introduction}</div>
      </div>
    </div>
  );
}
