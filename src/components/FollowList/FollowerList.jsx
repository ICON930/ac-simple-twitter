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
  const handleClick = async () => {
    if (isFollower) {
      // 如果已經在追蹤狀態，則執行取消追蹤
      const success = await Unfollow(followerId); // 這裡的 userId 是您要取消追蹤的使用者的 ID
      if (success) {
        setIsFollower(false);
      }
    } else {
      // 如果不在追蹤狀態，則執行追蹤
      const success = await Follow(followerId); // 這裡的 userId 是您要追蹤的使用者的 ID
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
              <Button title="跟隨" size="small" onClick={handleClick} />
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
export function FollowingList({
  avatar,
  name,
  introduction,
  isFollowed,
  Follow,
  Unfollow,
  followingId,
}) {
  const [isFollowing, setIsFollowing] = useState(isFollowed);
  const handleClick = async () => {
    if (isFollowing) {
      // 如果已經在追蹤狀態，則執行取消追蹤
      const success = await Unfollow(followingId); // 這裡的 userId 是您要取消追蹤的使用者的 ID
      if (success) {
        setIsFollowing(false);
      }
    } else {
      // 如果不在追蹤狀態，則執行追蹤
      const success = await Follow(followingId); // 這裡的 userId 是您要追蹤的使用者的 ID
      if (success) {
        setIsFollowing(true);
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
              <Button title="跟隨" size="small" onClick={handleClick} />
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
