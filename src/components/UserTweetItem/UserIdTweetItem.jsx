import styles from './UserIdTweetItem.module.scss'

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//載入圖片
import Avatar from "../../assets/icons/default-avatar.svg";
import { ReactComponent as ReplyIcon } from "../../assets/icons/reply-icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like-icon.svg";
import { ReactComponent as UnLikeIcon } from "../../assets/icons/like-active.svg";

//API
// import { getTweetReply } from "api/tweet";
import { getUserIdTweet } from "api/tweet";
import { getUserLikeTweet } from "api/like";
import { getUserReplyTweet } from "api/reply";

import { useAuth } from "contexts/AuthContext";

//mainPage UserPage的推文欄位
export function UserIdTweetItem({ userId, updateTweetCount }) {
  const [idTweets, setIdTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentMember } = useAuth(); 
  console.log('currentMember.id',currentMember?.id)
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setIsLoading(true);
        if (userId && token) {
        const data = await getUserIdTweet(token, userId);
        setIdTweets(data);  // 更新狀態以重新渲染組件
        setIsLoading(false); 
        if (typeof updateTweetCount === "function") {
          updateTweetCount(data.length);
        }
        console.log('data',data)
        }
      } catch (error) {
        console.log('Error Details:', error.response);
        console.log('Error fetching tweets:', error);
        setIsLoading(false);  
      }
    };
    fetchTweets(); 
  }, [userId, token, updateTweetCount]); 

  if (isLoading) {
  return <p>Loading...</p>;
  } 
  return (
    <div>
      {idTweets.map((tweet) => (
        <div className={styles.container} key={tweet.id}>
          <div className={styles.avatar}>
            <img className="cursor-point" src={tweet.User.avatar}alt="avatar" />
          </div>
          <div className={styles.userPanel}>
            <div className={styles.accountInfo}>
              <h6 className={styles.name}>{tweet.name}</h6>
              <h6 className={styles.accountAndTime}>
                @{tweet.User.account}．{tweet.createdAt}
              </h6>
            </div>
            <div className={styles.tweetContainer}>{tweet.description}</div>
            <div className={styles.iconEffect}>
              <div className={styles.replyEffect}>
                <ReplyIcon
                  className={`${styles.replyIcon} cursor-point`}
                  width="1em"
                  height="1em"
                />
                <h6 className={styles.replyCount}>{tweet.repliedAmount}</h6>
              </div>
              <div className={styles.likeEffect}>
                <LikeIcon
                  className={`${styles.likeIcon} cursor-point`}
                  width="1em"
                  height="1em"
                />
                <h6 className={styles.likeCount}>{tweet.likedAmount}</h6>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

//User回覆的推文欄位
export function UserIdReplyItem({ userId }) {
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentMember } = useAuth();
  console.log('currentMember.id',currentMember?.id)
  const token = localStorage.getItem('token'); 

  console.log('token',token);
  console.log('userId',userId);
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        setIsLoading(true);
        if (userId && token) {
          const data = await getUserReplyTweet(token, userId);
          console.log('replies data', data)
          setReplies(data);  // 更新狀態以重新渲染組件
          setIsLoading(false); 
        }
      } catch (error) {
        console.log('Error fetching replies:', error);
        setIsLoading(false);  
      }
    };
    fetchReplies(); 
  }, [userId, token]); 

  if (isLoading) {
    return <p>Loading...</p>;
  } 
  return (
    <div>
      {replies.map((reply) => (
        <div className={styles.container} key={reply.id}>
          {/* 頭像 */}
          <div className={styles.avatar}>
            <Link to={`/user/${reply.id}`}>
              <img className="cursor-point" src={reply.User.avatar} alt="avatar" />
            </Link>
          </div>
          {/* 使用者帳號名字時間 */}
          <div className={styles.userPanel}>
          <div className={styles.accountInfo}>
            <h6 className={styles.name}>{reply.User.name}</h6>
            <h6 className={styles.accountAndTime}>
              @{reply.User.account}．{reply.createdAt}
            </h6>
          </div>
          {/* 回覆 */}
          <div className={styles.replyUser}>
            <h6 className={styles.reply}>回覆</h6>
            <h6 className={styles.replyPostUser}>@{reply.id}</h6>
          </div>
          {/*回文內容 */}
          <div className={styles.replyContainer}>{reply.comment}</div>
        </div>
        </div>
      ))}
    </div>
  );
}

//User喜歡的內容欄位
export function UserIdLikeItem({ userId }) {
  const [userLikeData, setUserLikeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentMember } = useAuth()
  console.log('currentMember' ,currentMember);
  const token = localStorage.getItem('token')

  console.log('token',token);
  console.log('userId',userId) 

  useEffect(() => {
    const fetchUserLikeData = async () => {
      try {
        setIsLoading(true)
        if (userId && token) {
          const data = await getUserLikeTweet(token, userId)
          console.log('like data', data);
          setUserLikeData(data)
          setIsLoading(false)
        }
      } catch (error) {
        console.log('Error fetching UserLikeData:', error);
        setIsLoading(false)
      }
    }
    fetchUserLikeData()
  }, [userId, token]); 

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      {userLikeData.map((like)=> (
        <div className={styles.container} key={like.id}>
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
        <div className={styles.tweetContainer}>{userLikeData ? userLikeData.introduction : 'Loading...'}</div>
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
      ))}
   </div>
  );
}

