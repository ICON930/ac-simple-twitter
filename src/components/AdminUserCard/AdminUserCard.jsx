import styles from "./AdminUserCard.module.scss";

import admin_reply from "../../assets/icons/tweet-Icon.svg";
import admin_like from "../../assets/icons/like-icon.svg";

export default function AdminUserCard ({avatar, name, cover, account, followerAmount, followingAmount, tweetsAmount, likedAmount}) {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          className={styles.coverImg}
          src={cover}
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
        {name && account === "root" ? (
          <div className={styles.userInfoContainer}>
          <h5 className={styles.name}>{name}</h5>
          <h5 className={styles.account}>{account}</h5>
          <h5 className={styles.name}>管理員</h5>
          </div>
        ) : (
          <div className={styles.userInfoContainer}>
            <h5 className={styles.name}>{name}</h5>
            <h5 className={styles.account}>{account}</h5>
            <div className={styles.counts}>
              <img className={styles.icon} src={admin_reply} alt="reply"/>
              <span className={styles.number}>{tweetsAmount}</span>
              <img className={styles.icon} src={admin_like} alt="like"/>
              <span className={styles.number}>{likedAmount}</span>
            </div>
            <div className={styles.follows}>
              <span className={styles.followCount}>{followingAmount}</span>
              <span className={styles.followInfo}>跟隨中</span>
              <span className={styles.break}></span>
              <span className={styles.followCount}>{followerAmount}</span>
              <span className={styles.followInfo}>跟隨者</span>
            </div>
          </div>
          )}
      </div>
    </div>
  );
}