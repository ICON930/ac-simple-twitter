import styles from "./AdminUserCard.module.scss";

import admin_background from "../../assets/icons/catShockPhoto.svg";
import logo from "../../assets/icons/default-avatar.svg";
import admin_reply from "../../assets/icons/tweet-Icon.svg";
import admin_like from "../../assets/icons/like-icon.svg";

export default function AdminUserCard () {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          className={styles.coverImg}
          src={admin_background}
          alt="Cover img"
        />
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatar}
            src={logo}
            alt="Avatar"
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <h5 className={styles.name}>Apple</h5>
        <h5 className={styles.account}>@apple</h5>
        <div className={styles.counts}>
          <img className={styles.icon} src={admin_reply} alt="reply"/>
          <span className={styles.number}>1.5k</span>
          <img className={styles.icon} src={admin_like} alt="like"/>
          <span className={styles.number}>20k</span>
        </div>
        <div className={styles.follows}>
          <span className={styles.followCount}>34個</span>
          <span className={styles.followInfo}>跟隨中</span>
          <span className={styles.break}></span>
          <span className={styles.followCount}>59位</span>
          <span className={styles.followInfo}>跟隨者</span>
        </div>
      </div>
    </div>
  );
}