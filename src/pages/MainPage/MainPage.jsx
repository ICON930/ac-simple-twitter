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
import { Link } from "react-router-dom";
import { getTweets } from "api/tweet";

export default function MainPage() {
  const [tweets, setTweets] = useState([]);
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");
  const [shouldReloadTweets, setShouldReloadTweets] = useState(false);

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
  }, [isAuthenticated, token, shouldReloadTweets]);

  return (
    <div className={`${styles.container} container max-auto`}>
      <div className={styles.mainContainer}>
        <div className={styles.navContainer}>
          <NavContainer page="user" />
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.header}>
            <Header title="首頁" />
          </div>
          <div className={styles.tweetField}>
            <TweetField setShouldReloadTweets={setShouldReloadTweets} />
          </div>
          <div className={styles.userTweetItem}>
            {tweets.length > 0 ? (
              tweets.map((tweet) => (
                <Link key={tweet.id} to={`/tweets/${tweet.id}`}>
                  <UserTweetItem
                    key={tweet.id}
                    name={tweet.User.name}
                    account={tweet.User.account}
                    avatar={tweet.User.avatar}
                    description={tweet.description}
                    createdAt={tweet.createdAt}
                    repliedAmount={tweet.repliedAmount}
                    likedAmount={tweet.likedAmount}
                  />
                </Link>
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
