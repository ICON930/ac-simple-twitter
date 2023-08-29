import React, { useState } from "react";
import clsx from "clsx";
import styles from "./TweetModal.module.scss";
import CloseIcon from "../../assets/icons/noti-fail.svg";
import Avatar from "../../assets/icons/default-avatar.svg";
import Button from "components/Button/Button";

//api
import { useAuth } from "contexts/AuthContext";
import { postTweet } from "api/tweet";
import Swal from "sweetalert2";
export default function TweetModal({ isOpen, onClose }) {
  const [error, setError] = useState("");
  const { currentMember } = useAuth();
  const handlePostTweet = async () => {
    try {
      setError("");
      if (!isMaxLength) {
        await postTweet(localStorage.getItem("token"), description); // 呼叫發文API
        setDescription(""); // 清空輸入
      }
      Swal.fire({
        position: "top",
        title: "發文成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("發文失敗", error);
      setError("發文失敗");
      Swal.fire({
        position: "top",
        title: "發文失敗！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

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
            <img src={currentMember?.avatar || Avatar} alt="avatar" />
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
            <Button
              title="推文"
              size="small"
              onClick={handlePostTweet}
              isAction
            />
          </div>
        </div>
      </div>
    </div>
  );
}
