//components
import Header from "../../components/Header/Header";
import TweetField from "components/TweetField/TweetField";
import { UserTweetItem } from "components/UserTweetItem/UserTweetItem";
import NavContainer from "components/NavContainer/NavContainer";
import SuggestUserContainer from "components/SuggestUserContainer/SuggestUserContainer";

//scss
import styles from "./MainPage.module.scss";

import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { getTweets } from "api/tweet";

//new
import { useLikes } from "contexts/LikeContext";

export default function MainPage() {
  const [tweets, setTweets] = useState([]);

  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");
  const [shouldReloadTweets, setShouldReloadTweets] = useState(false);

  //new
  const { likes, addLike, removeLike } = useLikes();
  const [shouldRefresh, setShouldRefresh] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      const fetchTweets = async () => {
        try {
          const tweets = await getTweets(token);
          setTweets(tweets);
        } catch (error) {
          console.log("fetch tweets is Fail", error);
          setTweets([]);
        }
      };
      fetchTweets();
    }
  }, [isAuthenticated, token, shouldReloadTweets, likes]);

  const handleRefresh = () => {
    setShouldRefresh(true);
  };

  // 在需要时重新渲染组件
  if (shouldRefresh) {
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.navContainer}>
          <NavContainer page="user" />
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.header}>
            <Header title="首頁" />
          </div>
          <div className={styles.tweetField}>
            <TweetField
              setShouldReloadTweets={setShouldReloadTweets}
              onRefresh={handleRefresh}
            />
          </div>
          <div className={styles.userTweetItem}>
            {tweets.length > 0 ? (
              tweets.map((tweet) => (
                <UserTweetItem
                  key={tweet.id}
                  name={tweet.User.name}
                  account={tweet.User.account}
                  avatar={tweet.User.avatar}
                  description={tweet.description}
                  createdAt={tweet.createdAt}
                  repliedAmount={tweet.repliedAmount}
                  likedAmount={tweet.likedAmount}
                  tweet={tweet}
                  id={tweet.User.id}
                  onRefresh={handleRefresh}
                />
              ))
            ) : (
              <p>Loading...</p>
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
