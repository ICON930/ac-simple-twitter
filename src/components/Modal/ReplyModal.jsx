import styles from "./ReplyModal.module.scss";
import React, { useState } from "react";
import clsx from "clsx";
import CloseIcon from "../../assets/icons/noti-fail.svg";
import Button from "components/Button/Button";

export default function ReplyModal({ isOpen, onClose }) {
  const [description, setDescription] = useState("");
  if (!isOpen) {
    return null;
  }
  const isMaxLength = description.length > 140;
  const errorMessageClassName = clsx(styles.errorMessage, {
    [styles.showError]: isMaxLength,
  });
  return (
    <div className={styles.container}>
      <div className={styles.replyModal}>
        <div className={styles.header}>
          <img
            src={CloseIcon}
            alt="close"
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>
        <div className={styles.article}>
          <div className={styles.avatar}>
            <img src="" alt="" />
          </div>
          <div className={styles.userInfo}>
            <h6>name</h6>
            <h6>@account．time</h6>
          </div>
        </div>
        <div className={styles.userArticle}>description</div>
      </div>
    </div>
  );
}
