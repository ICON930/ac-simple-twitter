import styles from "./ReplyModal.module.scss";
import React, { useState } from "react";
import clsx from "clsx";
import CloseIcon from "../../assets/icons/noti-fail.svg";
import Button from "components/Button/Button";
import Avatar from "../../assets/icons/default-avatar.svg";
import Swal from "sweetalert2";
//API
import { ReplyTweet } from "api/tweet";

export default function ReplyModal({ isOpen, onClose, tweetInfo }) {
  const [comment, setComment] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const handleReply = async () => {
    if (!comment) {
      return;
    }
    setIsReplying(true);
    try {
      await ReplyTweet(localStorage.getItem("token"), comment, tweetInfo.id); // 將 comment 傳遞給 ReplyTweet
      setIsReplying(false);
      onClose();
      Swal.fire({
        position: "top",
        title: "回覆成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("Reply failed", error);
      setIsReplying(false);
      Swal.fire({
        position: "top",
        title: "回覆失敗！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };
  const isMaxLength = comment.length > 140;
  const isMinLength = comment.trim() === "";
  const errorMessageClassName = clsx(styles.errorMessage, {
    [styles.showError]: isMaxLength || isMinLength,
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
        <div className={styles.middle}>
          <div className={styles.avatar}>
            <img src={tweetInfo.User?.avatar || Avatar} alt="avatar" />
          </div>
          <div className={styles.article}>
            <div className={styles.userInfo}>
              <h6 className={styles.userName}>{tweetInfo?.User?.name}</h6>
              <h6 className={styles.accountAndTime}>
                @{tweetInfo?.User?.account}．{tweetInfo?.createdAt}
              </h6>
            </div>
            <div className={styles.userArticle}>{tweetInfo?.description}</div>
            <div className={styles.replyName}>
              <h6 className={styles.replyFor}>回覆給</h6>
              <h6 className={styles.forName}>@{tweetInfo?.User?.account}</h6>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.replyContainer}>
          <div className={styles.replyAvatar}>
            <img src={Avatar} alt="avatar" />
          </div>
          <div className={styles.textarea}>
            <textarea
              className={styles.textarea}
              placeholder="推你的回覆"
              value={comment}
              onChange={handleComment}
            ></textarea>
          </div>
        </div>
        <div className={styles.buttonAndMessage}>
          <div className={errorMessageClassName}>
            {isMaxLength && "字數不可超過140字"}
            {isMinLength && "內容不可為空白"}
          </div>
          <div className={styles.button}>
            <Button
              title="推文"
              size="small"
              onClick={handleReply}
              disabled={isReplying}
              isAction
            />
          </div>
        </div>
      </div>
    </div>
  );
}
