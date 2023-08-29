import { useState } from "react";
import clsx from "clsx";
import Swal from "sweetalert2";
import styles from "./TweetField.module.scss";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import Avatar from "../../assets/icons/default-avatar.svg";
//api
import { useAuth } from "contexts/AuthContext";
import { postTweet } from "api/tweet";

export default function TweetField({ avatar, setShouldReloadTweets }) {
  const [description, setDescription] = useState("");
  const { currentMember } = useAuth(); // 使用 useAuth 取得登入者資訊
  const [error, setError] = useState("");
  const handlePostTweet = async () => {
    setShouldReloadTweets(true);
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

  //輸入內容
  const haneleDescription = (e) => {
    setDescription(e.target.value);
  };
  const isMaxLength = description.length > 140;
  const errorMessageClassName = clsx(styles.errorMessage, {
    [styles.showError]: isMaxLength,
  });
  return (
    <div className={styles.fieldContainer}>
      <div className={styles.tweetContainer}>
        <div className={styles.avatar}>
          <Link to={`/user`}>
            <img
              className="cursor-point"
              src={currentMember?.avatar || Avatar}
              alt="avatar"
            />
          </Link>
        </div>
        <div className={styles.textAreaContainer}>
          <textarea
            className={styles.textarea}
            placeholder="有什麼新鮮事?"
            value={description}
            onChange={haneleDescription}
          ></textarea>
        </div>
      </div>
      <div className={styles.buttonAndMessage}>
        {isMaxLength && (
          <div className={errorMessageClassName}>字數超出上限!</div>
        )}
        <div className={styles.tweetButton}>
          <Button
            size="small"
            title="推文"
            onClick={handlePostTweet}
            isAction
          ></Button>
        </div>
      </div>
    </div>
  );
}
