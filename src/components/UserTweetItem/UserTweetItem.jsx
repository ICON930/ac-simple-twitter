import styles from "./UserTweetItem.module.scss";

// import { useState } from "react";
import { Link } from "react-router-dom";
//載入圖片
import Avatar from "../../assets/icons/default-avatar.svg";
import { ReactComponent as ReplyIcon } from "../../assets/icons/reply-icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like-icon.svg";
import { ReactComponent as UnLikeIcon } from "../../assets/icons/like-active.svg";
//mainPage UserPage的推文欄位
export function UserTweetItem({
  name,
  account,
  avatar,
  description,
  createdAt,
  repliedAmount,
  likedAmount,
}) {
  console.log("UserTweetItem Props:", {
    name,
    account,
    avatar,
    description,
    createdAt,
    repliedAmount,
    likedAmount,
  });
  return (
    <div className={styles.container}>
      {/* 頭像 */}
      <div className={styles.avatar}>
        <img className="cursor-point" src={avatar} alt="avatar" />
      </div>
      <div className={styles.userPanel}>
        {/* 使用者帳號名字時間 */}
        <div className={styles.accountInfo}>
          <h6 className={styles.name}>{name}</h6>
          <h6 className={styles.accountAndTime}>
            @{account}．{createdAt}
          </h6>
        </div>
        {/* 推文內容 */}
        <div className={styles.tweetContainer}>{description}</div>
        {/* 回覆及愛心功能 */}
        <div className={styles.iconEffect}>
          <div className={styles.replyEffect}>
            <ReplyIcon
              className={`${styles.replyIcon}cursor-point`}
              width="1em"
              height="1em"
              //onClick={replyModal}
            />
            <h6 className={styles.replyCount}>{repliedAmount}</h6>
          </div>
          <div className={styles.likeEffect}>
            <LikeIcon
              className={`${styles.likeIcon}cursor-point`}
              width="1em"
              height="1em"
              //   onClick={handlelike}
            />
            <h6 className={styles.likeCount}>{likedAmount}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

//User回覆的推文欄位
export function UserReplyItem() {
  return (
    <div className={styles.container}>
      {/* 頭像 */}
      <div className={styles.avatar}>
        <Link to={`/user`}>
          <img className="cursor-point" src={Avatar} alt="avatar" />
        </Link>
      </div>
      <div className={styles.userPanel}>
        {/* 使用者帳號名字時間 */}
        <div className={styles.accountInfo}>
          <h6 className={styles.name}>name</h6>
          <h6 className={styles.accountAndTime}>@account．time</h6>
        </div>
        {/* 回覆 */}
        <div className={styles.replyUser}>
          <h6 className={styles.reply}>回覆</h6>
          <h6 className={styles.replyPostUser}>@user</h6>
        </div>
        {/*回文內容 */}
        <div className={styles.replyContainer}>replyContent</div>
      </div>
    </div>
  );
}

//User喜歡的內容欄位
export function UserLikeItem() {
  return (
    <div className={styles.container}>
      {/* 頭像 */}
      <div className={styles.avatar}>
        <img className="cursor-point" src={Avatar} alt="avatar" />
      </div>
      <div className={styles.userPanel}>
        {/* 使用者帳號名字時間 */}
        <div className={styles.accountInfo}>
          <h6 className={styles.name}>name</h6>
          <h6 className={styles.accountAndTime}>@account．time</h6>
        </div>
        {/* 推文內容 */}
        <div className={styles.tweetContainer}>description</div>
        {/* 回覆及愛心功能 */}
        <div className={styles.iconEffect}>
          <div className={styles.replyEffect}>
            <ReplyIcon
              className={`${styles.replyIcon}cursor-point`}
              width="1em"
              height="1em"
              //   onClick={handleReply}
            />
            <h6 className={styles.replyCount}>123</h6>
          </div>
          <div className={styles.likeEffect}>
            <UnLikeIcon
              className={`${styles.likeIcon}cursor-point`}
              //   onClick={handlelike}
            />
            <h6 className={styles.likeCount}>123</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
