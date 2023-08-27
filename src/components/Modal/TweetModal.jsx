import React, { useState } from "react";
import clsx from "clsx";
import styles from "./TweetModal.module.scss";
import CloseIcon from "../../assets/icons/noti-fail.svg";
import Avatar from "../../assets/icons/default-avatar.svg";
import Button from "components/Button/Button";

export default function TweetModal({ isOpen, onClose }) {
  //控制MODAL開關
  const [description, setDescription] = useState("");
  if (!isOpen) {
    return null;
  }

  //設定超過字數上限提示
  const isMaxLength = description.length > 140;
  const errorMessageClassName = clsx(styles.errorMessage, {
    [styles.showError]: isMaxLength,
  });
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.tweetModal}>
        <div className={styles.header}>
          <img
            src={CloseIcon}
            alt="close"
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>
        <div className={styles.middleContent}>
          <div className={styles.avatar}>
            <img src={Avatar} alt="avatar" />
          </div>
          <div className={styles.textarea}>
            <textarea
              className={styles.textarea}
              placeholder="有什麼新鮮事?"
              value={description}
              onChange={handleDescription}
            ></textarea>
          </div>
        </div>
        <div className={styles.buttonAndMessage}>
          {isMaxLength && (
            <div className={errorMessageClassName}>字數不可超過140字</div>
          )}
          <div className={styles.button}>
            <Button title="推文" size="small" isAction />
          </div>
        </div>
      </div>
    </div>
  );
}
