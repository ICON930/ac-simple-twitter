import React from "react";
import styles from "./TweetModal.module.scss";
import CloseIcon from "../../assets/icons/noti-Icon.svg";
export default function TweetModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.tweetModal}>
      <div className={styles.header}>
        <CloseIcon className={styles.closeIcon} />
      </div>
      <div className={styles.middleContent}>
        <div className={styles.avatar}>
          <img src="" alt="" />
          <textarea></textarea>
        </div>
      </div>
    </div>
  );
}
