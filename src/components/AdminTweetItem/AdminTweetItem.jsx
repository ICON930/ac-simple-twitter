import logo from "../../assets/icons/default-avatar.svg";
import admin_delete from "../../assets/icons/cross-gray.svg";

import styles from "./AdminTweetItem.module.scss";

export default function AdminTweetItem () {
    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                <img className={styles.avatarImg} src={logo} alt="avatar" />
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.userInfo}>
                    <h5 className={styles.name}>Apple</h5>
                    <span className={styles.account}>@apple</span>
                    <span className={styles.tweetTime}>3 小時</span>
                </div>
                <div className={styles.tweetContent}>
                    A man is not old as long as he is seeking something. A man is not old until regrets take the place of dreams. A man is not old as long as he is seeking something. A man is not old until regrets take the place of dreams.A man is not old as long as he is seeking something. A man is not old until regrets take the place of dreams.
                </div>
            </div>
            <div className={styles.adminDelete}>
              <img className={styles.deleteImg} src={admin_delete} alt="admin_delete" />
            </div>
        </div>
    );
}