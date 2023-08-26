import styles from "./AdminUserCard.module.scss";

import admin_reply from "../../assets/icons/tweet-Icon.svg";
import admin_like from "../../assets/icons/like-icon.svg";

export default function AdminUserCard (avatar, name, coverPhoto, account, followerCount, followingCount, tweetCount, likeCount) {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          className={styles.coverImg}
          src={coverPhoto}
          alt="Cover img"
        />
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatar}
            src={avatar}
            alt="Avatar"
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <h5 className={styles.name}>{name}</h5>
        <h5 className={styles.account}>{account}</h5>
        <div className={styles.counts}>
          <img className={styles.icon} src={admin_reply} alt="reply"/>
          <span className={styles.number}>{tweetCount}</span>
          <img className={styles.icon} src={admin_like} alt="like"/>
          <span className={styles.number}>{likeCount}</span>
        </div>
        <div className={styles.follows}>
          <span className={styles.followCount}>{followingCount}</span>
          <span className={styles.followInfo}>跟隨中</span>
          <span className={styles.break}></span>
          <span className={styles.followCount}>{followerCount}</span>
          <span className={styles.followInfo}>跟隨者</span>
        </div>
      </div>
    </div>
  );
}