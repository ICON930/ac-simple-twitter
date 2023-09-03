import styles from "./UserTweetItem.module.scss";

import { useState } from "react";
import { Link } from "react-router-dom";
import ReplyModal from "components/Modal/ReplyModal";
//載入圖片
import Avatar from "../../assets/icons/default-avatar.svg";
import { ReactComponent as ReplyIcon } from "../../assets/icons/reply-icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like-icon.svg";
import { ReactComponent as UnLikeIcon } from "../../assets/icons/like-active.svg";

//new
import { useLikes } from "contexts/LikeContext";

//mainPage UserPage的推文欄位

export function UserTweetItem({
  name,
  account,
  avatar,
  description,
  createdAt,
  repliedAmount,
  tweet,
  id,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  //new
  const { likes, addLike, removeLike } = useLikes();
  const [isLiked, setIsLiked] = useState(likes.includes(tweet.id));
  const token = localStorage.getItem("token");
  
  const handleLike = async () => {
    if (!isLiked) {
      await addLike(tweet.id, token);
      setIsLiked(true);
    } else {
      await removeLike(tweet.id, token);
      setIsLiked(false);
    }
  };

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={styles.container}>
      {/* 頭像 */}
      <div className={styles.avatar}>
        <Link to={`/user/${id}`}>
          <img className="cursor-point" src={avatar || Avatar} alt="avatar" />
        </Link>
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
        <Link to={`/tweets/${tweet.id}`}>
          <div className={styles.tweetContainer}>{description}</div>
        </Link>
        {/* 回覆及愛心功能 */}
        <div className={styles.iconEffect}>
          <div className={styles.replyEffect}>
            <ReplyIcon
              className={styles.replyIcon}
              width="1em"
              height="1em"
              onClick={() => openModal(tweet)}
            />
            {isOpenModal && (
              <ReplyModal
                isOpen={isOpenModal}
                onClose={closeModal}
                tweetInfo={tweet}
              />
            )}
            <h6 className={styles.replyCount}>{repliedAmount}</h6>
          </div>
          <div className={styles.likeEffect}>
            {isLiked ? (
              <UnLikeIcon
                className={styles.likeIcon}
                onClick={handleLike}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <LikeIcon
                className={styles.likeIcon}
                onClick={handleLike}
                style={{ cursor: "pointer" }}
              />
            )}
            <h6 className={styles.likeCount}>{tweet.likedAmount}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

//User回覆的推文欄位
export function UserReplyItem({ reply }) {
  const {
    User: { name, account, avatar, id } = {},
    createdAt,
    comment,
  } = reply;
  return (
    <div className={styles.container}>
      {/* 頭像 */}
      <div className={styles.avatar}>
        <Link to={`/user/${id}`}>
          <img src={avatar} alt="avatar" />
        </Link>
      </div>
      <div className={styles.userPanel}>
        {/* 使用者帳號名字時間 */}
        <div className={styles.accountInfo}>
          <h6 className={styles.name}>{name}</h6>
          <h6 className={styles.accountAndTime}>
            @{account}．{createdAt}
          </h6>
        </div>
        {/* 回覆 */}
        <div className={styles.replyUser}>
          <h6 className={styles.reply}>回覆</h6>
          <h6 className={styles.replyPostUser}>@{name}</h6>
        </div>
        {/*回文內容 */}
        <div className={styles.replyContainer}>{comment}</div>
      </div>
    </div>
  );
}
