import styles from "./FollowerList.module.scss";
import Button from "components/Button/Button";
import Avatar from "../../assets/icons/default-avatar.svg";

export default function FollowerList() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <img src={Avatar} alt="avatar" />
          </div>
          <div className={styles.followerName}>name</div>
          <div className={styles.button}>
            <Button title="正在跟隨" size="middle" isAction />
          </div>
        </div>
        <div className={styles.introduction}>
          11111111111111111111111111111111111111111111111111111111111111111111111
        </div>
      </div>
    </div>
  );
}
