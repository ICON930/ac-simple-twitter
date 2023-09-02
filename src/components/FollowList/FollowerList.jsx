import styles from "./FollowerList.module.scss";
import Button from "components/Button/Button";
import Avatar from "../../assets/icons/default-avatar.svg";
import { useState } from "react";

export function FollowerList({
  avatar,
  name,
  introduction,
  isFollowed,
  Follow,
  Unfollow,
  id,
}) {
  const [isFollower, setIsFollower] = useState(isFollowed);
  const handleClick = async () => {
    console.log("Clicked user ID:", id);
    if (isFollower) {
      const success = await Follow(id);
      if (success) {
        setIsFollower(false);
      }
    } else {
      const success = await Unfollow(id);
      if (success) {
        setIsFollower(true);
      }
    }
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
            {isFollower ? (
              <Button
                title="跟隨"
                size="small"
                onClick={() => handleClick(id)}
              />
            ) : (
              <Button
                title="正在跟隨"
                size="middle"
                onClick={() => handleClick(id)}
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
export function FollowingList({
  avatar,
  name,
  introduction,
  isFollowed,
  Follow,
  Unfollow,

  id,
}) {
  const [isFollowing, setIsFollowing] = useState(isFollowed);
  const handleClick = async () => {
    console.log("Clicked user ID:", id);
    if (isFollowing) {
      // 如果已經在追蹤狀態，則執行取消追蹤
      const success = await Follow(id); // 您要取消追蹤的使用者的 ID
      if (success) {
        setIsFollowing(true);
      }
    } else {
      // 如果不在追蹤狀態，則執行追蹤
      const success = await Unfollow(id); //要追蹤的使用者的 ID
      if (success) {
        setIsFollowing(false);
      }
    }
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
              <Button
                title="跟隨"
                size="small"
                onClick={() => handleClick(id)}
              />
            ) : (
              <Button
                title="正在跟隨"
                size="middle"
                onClick={() => handleClick(id)}
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
