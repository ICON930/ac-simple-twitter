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
  followerId,
}) {
  const [isFollower, setIsFollower] = useState(isFollowed);
  const token = localStorage.getItem("token");
  const handleClick = async () => {
    console.log("Clicked user ID:", followerId);
    if (isFollower) {
      const success = await Unfollow(followerId, token);
      if (success.message === "取消跟隨成功!") {
        setIsFollower(false);
      }
    } else {
      const success = await Follow(followerId, token);
      if (success.message === "跟隨成功!") {
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
                title="正在跟隨"
                size="middle"
                onClick={() => handleClick(followerId)}
                isAction
              />
            ) : (
              <Button
                title="跟隨"
                size="small"
                onClick={() => handleClick(followerId)}
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
  followingId,
}) {
  const [isFollower, setIsFollower] = useState(isFollowed);
  const token = localStorage.getItem("token");
  const handleClick = async () => {
    console.log("Clicked user ID:", followingId);
    if (isFollower) {
      const success = await Unfollow(followingId, token);
      if (success.message === "取消跟隨成功!") {
        setIsFollower(false);
      }
    } else {
      const success = await Follow(followingId, token);
      if (success.message === "跟隨成功!") {
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
                title="正在跟隨"
                size="middle"
                onClick={() => handleClick(followingId)}
                isAction
              />
            ) : (
              <Button
                title="跟隨"
                size="small"
                onClick={() => handleClick(followingId)}
              />
            )}
          </div>
        </div>
        <div className={styles.introduction}>{introduction}</div>
      </div>
    </div>
  );
}
