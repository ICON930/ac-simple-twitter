import { useState } from "react";

import styles from "./TweetField.module.scss";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import Avatar from "../../assets/icons/default-avatar.svg";

export default function TweetField() {
  const [description, setDescription] = useState("");

  //輸入內容
  const haneleDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className={styles.fieldContainer}>
      <div className={styles.tweetContainer}>
        <div className={styles.avatar}>
          <Link to={`/user`}>
            <img className="cursor-point" src={Avatar} alt="avatar" />
          </Link>
        </div>
        <div className={styles.textAreaContainer}>
          <textarea
            className={styles.textarea}
            placeholder="有什麼新鮮事"
            maxLength="140"
            value={description}
            onChange={haneleDescription}
          ></textarea>
        </div>
      </div>
      {description.length === 140 && (
        <div className={styles.errorMessage}>字數超出上限!</div>
      )}
      <div className={styles.tweetButton}>
        <Button size="small" title="推文" isAction></Button>
      </div>
    </div>
  );
}
