//Scss
import styles from "./ReplyItem.module.scss";
//SVG
import { ReactComponent as ReplyIcon } from "../../assets/icons/reply-icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like-icon.svg";
import { ReactComponent as UnLikeIcon } from "../../assets/icons/like-active.svg";
//api
import { getUserTweet } from "api/tweet";
import { useEffect, useState } from "react";

export default function PostTweet({ tweetid }) {
  const [tweetData, setTweetData] = useState(null);
  useEffect(() => {
    const fetchTweetData = async () => {
      try {
        const data = await getUserTweet(localStorage.getItem("token"), tweetid);
        setTweetData(data);
      } catch (error) {
        console.log("fetch tweet data failed", error);
      }
    };
    fetchTweetData();
  }, [tweetid]);
  if (!tweetData) {
    return;
  }
  const {
    User: { name, account, avatar },
    description,
    createdAtTime,
    createdAtDate,
    repliedAmount,
    likedAmount,
  } = tweetData;
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <img src={avatar} alt="avatar" />
          </div>
          <div className={styles.nameAndAccount}>
            <h6 className={styles.name}>{name}</h6>
            <h6 className={styles.account}>@{account}</h6>
          </div>
        </div>
        <div className={styles.middleContainer}>{description}</div>
        <div className={styles.time}>
          {createdAtTime}．{createdAtDate}
        </div>
      </div>
      <div className={styles.replyAndLikeCount}>
        <div className={styles.reply}>
          <p className={styles.count}>{repliedAmount}</p>
          <p className={styles.replyAndLike}>回覆</p>
        </div>
        <div className={styles.like}>
          <p className={styles.count}>{likedAmount}</p>
          <p className={styles.replyAndLike}>喜歡次數</p>
        </div>
      </div>
      <div className={styles.icon}>
        <ReplyIcon className={styles.replyIcon} />
        <LikeIcon className={styles.likeIcon} />
      </div>
    </div>
  );
}
