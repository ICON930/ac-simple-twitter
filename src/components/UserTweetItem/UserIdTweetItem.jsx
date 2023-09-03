import styles from './UserIdTweetItem.module.scss'

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//載入圖片
import Avatar from "../../assets/icons/default-avatar.svg";
import { ReactComponent as ReplyIcon } from "../../assets/icons/reply-icon.svg";
import { ReactComponent as LikeIcon } from "../../assets/icons/like-icon.svg";
import { ReactComponent as UnLikeIcon } from "../../assets/icons/like-active.svg";

//API
import { getUserIdTweet } from "api/tweet";
import { getUserLikeTweet } from "api/like";
import { getUserReplyTweet } from "api/reply";

import { useLikes } from 'contexts/LikeContext';

//mainPage UserPage的推文欄位
export function UserIdTweetItem({ userId, updateTweetCount }) {
  const [idTweets, setIdTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token'); 
  const { likes, addLike, removeLike } = useLikes();  

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setIsLoading(true);
        if (userId && token) {
          const data = await getUserIdTweet(token, userId);
          if (Array.isArray(data)) {
            setIdTweets(data);
            if (typeof updateTweetCount === "function") {
              updateTweetCount(data.length);
            }
          } else {
            console.error('Expected an array but received', data);
            setIdTweets([]);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error Details:', error.response);
        console.log('Error fetching tweets:', error);
        setIsLoading(false);  
      }
    };
    fetchTweets(); 
  }, [userId, token, updateTweetCount]);

  const handleLike = async (tweetId) => {
    try {
      if (likes.includes(tweetId)) {
        await removeLike(tweetId, token);
      } else {
        await addLike(tweetId, token);
      }

      const updatedTweets = idTweets.map(tweet => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            likedAmount: likes.includes(tweetId) ? tweet.likedAmount - 1 : tweet.likedAmount + 1,
          };
        }
        return tweet;
      });

      setIdTweets(updatedTweets);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  if (isLoading) {
  return <p>Loading...</p>;
  } 

  if (idTweets.length === 0) {
  return <p>使用者無推文</p>;
  }

  return (
    <div>
      {idTweets.map((tweet) => (
        <div className={styles.container} key={tweet.id}>
          <div className={styles.avatar}>
            <Link to={`/user/${userId}`}>
            <img className="cursor-point" src={tweet.User.avatar || Avatar}alt="avatar" />
            </Link>
          </div>
          <div className={styles.userPanel}>
            <div className={styles.accountInfo}>
              <h6 className={styles.name}>{tweet.User.name}</h6>
              <h6 className={styles.accountAndTime}>
                @{tweet.User.account}．{tweet.createdAt}
              </h6>
            </div>
            <Link to={`/tweets/${tweet.id}`}>
            <div className={styles.tweetContainer}>{tweet.description}</div>
            </Link>
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
                {
                  likes.includes(tweet.id) ? 
                (<UnLikeIcon
                  className={styles.likeIcon}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleLike(tweet.id)}
                />) :
                (<LikeIcon
                  className={styles.likeIcon}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleLike(tweet.id)}
                />
                )}
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
  const token = localStorage.getItem('token'); 
  
  useEffect(() => {
  const fetchReplies = async () => {
    try {
      setIsLoading(true);
      if (userId && token) {
        const data = await getUserReplyTweet(token, userId);
        
        // 檢查 data 是否為陣列
        if (Array.isArray(data)) {
          setReplies(data);
        } else {
          console.error('Expected an array but received', data);
          setReplies([]);
        }

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

  if (replies.length === 0) {
  return <p>使用者無回覆推文</p>;
  }

  return (
    <div>
      {replies.map((reply) => (
        <div className={styles.container} key={reply.id}>
          {/* 頭像 */}
          <div className={styles.avatar}>
            <Link to={`/user/${userId}`}>
              <img className="cursor-point" src={reply.User.avatar || Avatar} alt="avatar" />
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
            <h6 className={styles.replyPostUser}>@{reply.Tweet.User.account}</h6>
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
  const token = localStorage.getItem('token')
  const { addLike, removeLike } = useLikes();

  useEffect(() => {
    const fetchUserLikeData = async () => {
      try {
        setIsLoading(true);
        if (userId && token) {
          const data = await getUserLikeTweet(token, userId);
          
          // 檢查 data 是否為陣列
          if (Array.isArray(data)) {
            setUserLikeData(data);
          } else {
            console.error('Expected an array but received', data);
            setUserLikeData([]);
          }

          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error fetching UserLikeData:', error);
        setIsLoading(false);
      }
    };
    fetchUserLikeData();
  }, [userId, token]);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (userLikeData.length === 0) {
  return <p>使用者無喜歡的內容</p>;
  }

  return (
    <div>
      {userLikeData.map((like)=> (
      <div className={styles.container} key={like.id}>
      {/* 頭像 */}
      <div className={styles.avatar}>
        <img className="cursor-point" src={like.Tweet.User.avatar || Avatar} alt="avatar" />
      </div>
      <div className={styles.userPanel}>
        {/* 使用者帳號名字時間 */}
        <div className={styles.accountInfo}>
          <h6 className={styles.name}>{like.Tweet.User.name}</h6>
          <h6 className={styles.accountAndTime}>@{like.Tweet.User.account}．{like.tweetCreatedAt}</h6>
        </div>
        {/* 推文內容 */}
        <Link to={`/tweets/${like.Tweet.id}`}>
        <div className={styles.tweetContainer}>{userLikeData ? like.Tweet.description : 'Loading...'}</div>
        </Link>
        {/* 回覆及愛心功能 */}
        <div className={styles.iconEffect}>
          <div className={styles.replyEffect}>
            <ReplyIcon
              className={`${styles.replyIcon}cursor-point`}
              width="1em"
              height="1em"
            />
            <h6 className={styles.replyCount}>{like.replies?.length}</h6>
          </div>
          <div className={styles.likeEffect}>
            {
            like.isLiked ? 
            <UnLikeIcon
              className={styles.likeIcon}
              style={{ cursor: 'pointer' }}
              onClick={async () => {
                try {
                  await removeLike(like.Tweet.id, token);
                 setUserLikeData(prevData => prevData.filter(item => item.id !== like.id));
                } catch (error) {
                  console.error('Failed to remove like:', error);
                }
              }}
            /> :
            <LikeIcon
              className={styles.likeIcon}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                addLike(like.Tweet.id, token).then(() => {
                  setUserLikeData(prevData => prevData.map(item => {
                    if (item.id === like.id) {
                      return {
                        ...item,
                        isLiked: true,
                        likedAmount: item.likedAmount + 1
                      };
                    }
                    return item;
                  }));
                });
              }}
            />
          }
            <h6 className={styles.likeCount}>{like.likedAmount}</h6>
          </div>
        </div>
      </div>
    </div>
      ))}
   </div>
  );
}

