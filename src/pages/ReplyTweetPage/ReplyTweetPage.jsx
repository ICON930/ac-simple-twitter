//components
import Header from "../../components/Header/Header";
import NavContainer from "components/NavContainer/NavContainer";
import SuggestUserContainer from "components/SuggestUserContainer/SuggestUserContainer";
import PostTweet from "components/ReplyItem/ReplyItem";
import { UserReplyItem } from "components/UserTweetItem/UserTweetItem";
import { useEffect } from "react";
import { useState } from "react";
//SCSS
import styles from "./ReplyTweetPage.module.scss";
import { useParams } from "react-router";
import { getTweetReply, getUserTweet } from "api/tweet";
export default function ReplyTweetPage() {
  const { tweetid } = useParams(); //取得tweetID
  const [tweetData, setTweetData] = useState(null);

  useEffect(() => {
    const fetchTweetData = async () => {
      try {
        const [tweet, replies] = await Promise.all([
          getUserTweet(localStorage.getItem("token"), tweetid),
          getTweetReply(localStorage.getItem("token"), tweetid),
        ]);
        if (
          replies.status === "success" &&
          replies.message === "此篇推文目前沒有回覆。"
        ) {
          // 沒有回覆，設置空陣列
          setTweetData({ tweet, replies: [] });
        } else {
          // 有回覆，設置回覆資料
          setTweetData({ tweet, replies });
        }
      } catch (error) {
        console.log("fetch tweet data failed", error);
      }
    };
    fetchTweetData();
  }, [tweetid]);

  if (!tweetData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.replyContainer}>
        <div className={styles.navContainer}>
          <NavContainer page="user" />
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.header}>
            <Header title="推文" arrow />
          </div>
          <div className={styles.tweet}>
            <PostTweet tweetid={tweetid} />
          </div>
          <div className={styles.replytweet}>
            {tweetData.replies.length === 0 ? (
              <p>目前沒有回覆</p>
            ) : (
              tweetData.replies.map((reply) => (
                <UserReplyItem key={reply.id} reply={reply} />
              ))
            )}
          </div>
        </div>
        <div className={styles.sugContainer}>
          <SuggestUserContainer />
        </div>
      </div>
    </div>
  );
}
