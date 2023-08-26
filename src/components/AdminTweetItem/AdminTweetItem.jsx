import admin_delete from "../../assets/icons/cross-gray.svg";

import styles from "./AdminTweetItem.module.scss";

export default function AdminTweetItem (avatar, userName, account, createdAt, description, onDelete) {
    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img className={styles.avatarImg} src={avatar} alt="avatar" />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.userInfo}>
                    <h5 className={styles.name}>{userName}</h5>
                    <span className={styles.account}>@{account}</span>
                    <span className={styles.tweetTime}>{createdAt}</span>
                </div>
                <div className={styles.tweetContent}>
                    {description}
                </div>
            </div>
            <div className={styles.adminDelete} onClick={onDelete}>
              <img className={styles.deleteImg} src={admin_delete} alt="admin_delete" />
            </div>
        </div>
    );
}