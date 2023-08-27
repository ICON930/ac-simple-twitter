//components
import Header from "../../components/Header/Header";
import TweetField from "components/TweetField/TweetField";
import { UserTweetItem } from "components/UserTweetItem/UserTweetItem";
import NavContainer from "components/NavContainer/NavContainer";
import SuggestUserContainer from "components/SuggestUserContainer/SuggestUserContainer";

//scss
import styles from "./MainPage.module.scss";

//api
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { getTweets } from "api/tweet";

export default function MainPage() {
  const [tweets, setTweets] = useState([]);
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("isAuthenticatad", isAuthenticated);
    if (isAuthenticated) {
      const fetchTweets = async () => {
        try {
          const tweetsData = await getTweets(token);
          setTweets(tweetsData.tweets);
        } catch (error) {
          console.log("fetch tweets is Fail", error);
          setTweets([]);
        }
      };
      fetchTweets();
    }
  }, [isAuthenticated, token]);

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
            <TweetField />
          </div>
          <div className={styles.userTweetItem}>
            {tweets ? (
              tweets.length > 0 ? (
                tweets.map((tweetData) => (
                  <UserTweetItem
                    key={tweetData.id}
                    name={tweetData.User.name}
                    account={tweetData.User.account}
                    avatar={tweetData.User.avatar}
                    description={tweetData.description}
                    createdAt={tweetData.createdAt}
                    repliedAmount={tweetData.repliedAmount}
                    likedAmount={tweetData.likedAmount}
                  />
                ))
              ) : (
                <p>No tweets available.</p>
              )
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
