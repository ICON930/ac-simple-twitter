//Scss
import styles from "./ReplyItem.module.scss";
//SVG
import { ReactComponent as ReplyIcon } from "../../assets/icons/reply-icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like-icon.svg";
import { ReactComponent as UnLikeIcon } from "../../assets/icons/like-active.svg";
//api
import { getUserTweet } from "api/tweet";
import { useEffect, useState } from "react";
import ReplyModal from "components/Modal/ReplyModal";
import { useLikes } from "contexts/LikeContext";

export default function PostTweet({ tweetid }) {
  const [tweetData, setTweetData] = useState(null);

  const [isOpenModal, setIsOpenModal] = useState(false);

    //new
  const { likes, addLike, removeLike } = useLikes();
  const [isLiked, setIsLiked] = useState(likes.includes(tweetid));
  const token = localStorage.getItem("token");
  
  const handleLike = async () => {
    let newLikedAmount = likedAmount;
    if (!isLiked) {
      await addLike(tweetid, token);
      setIsLiked(true);
      newLikedAmount++;
    } else {
      await removeLike(tweetid, token);
      setIsLiked(false);
      newLikedAmount--;
    }
    setTweetData({ ...tweetData, likedAmount: newLikedAmount });
  };

    useEffect(() => {
    setIsLiked(likes.includes(tweetid));
    }, [likes, tweetid]);

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
    return null;
  }
  const {
    User: { name, account, avatar },
    description,
    createdAtTime,
    createdAtDate,
    repliedAmount,
    likedAmount,
  } = tweetData;

  const openModal = (tweet) => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
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
        <ReplyIcon
          className={`${styles.replyIcon}`}
          width="1em"
          height="1em"
          onClick={() => openModal(tweetData)}
        />
        {isOpenModal && (
          <ReplyModal
            isOpen={isOpenModal}
            onClose={closeModal}
            tweetInfo={tweetData}
          />
        )}
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
      </div>
    </div>
  );
}
