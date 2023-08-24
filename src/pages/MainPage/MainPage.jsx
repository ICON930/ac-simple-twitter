//components
import Header from "../../components/Header/Header";
import TweetField from "components/TweetField/TweetField";
import UserTweetItem from "components/UserTweetItem/UserTweetItem";
import NavContainer from "components/NavContainer/NavContainer";
import SuggestUserContainer from "components/SuggestUserContainer/SuggestUserContainer";

//scss
import styles from "./MainPage.module.scss";

//api

export default function MainPage() {
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
            <UserTweetItem />
          </div>
        </div>
        <div className={styles.sugContainer}>
          <SuggestUserContainer />
        </div>
      </div>
    </div>
  );
}
