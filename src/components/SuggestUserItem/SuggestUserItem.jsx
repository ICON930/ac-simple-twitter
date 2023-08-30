import Button from "../Button/Button.jsx";
import logo from "../../assets/icons/default-avatar.svg";
import styles from "./SuggestUserItem.module.scss";

export default function SuggestUserItem({ avatar, name, account }) {
    return (
        <div className={styles.container}>
            <div className={styles.avatarContainer}>
                <img className={styles.userAvatar} src={avatar || logo} alt="avatar" />
            </div>
            <div className={styles.userInfo}>
                <p className={styles.userInfoName}>{name}</p>
                <p className={styles.userInfoAccount}>@{account}</p>
            </div>
            <div className={styles.btnFollow}>
                <Button title="正在跟隨" size="middle" isAction></Button>
            </div>
        </div>
    );
}