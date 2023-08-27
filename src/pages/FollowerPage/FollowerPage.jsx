//components
import Header from "../../components/Header/Header";
import NavContainer from "components/NavContainer/NavContainer";
import SuggestUserContainer from "components/SuggestUserContainer/SuggestUserContainer";
import FollowerList from "components/FollowList/FollowerList";

import { Link } from "react-router-dom";

//scss
import styles from "./FollowerPage.module.scss";

//api

export default function FollowerPage() {
  return (
    <div className={`${styles.container} container max-auto`}>
      <div className={styles.mainContainer}>
        <div className={styles.navContainer}>
          <NavContainer page="user" />
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.header}>
            <Header title="name" arrow tweetCount />
          </div>
          <div className={styles.followTable}>
            <ul>
              <li>
                <Link to="/follower">追隨者</Link>
              </li>
              <li>
                <Link to="/following">正在追隨中</Link>
              </li>
            </ul>
          </div>
          <div className={styles.followList}>
            <FollowerList />
          </div>
        </div>
        <div className={styles.sugContainer}>
          <SuggestUserContainer />
        </div>
      </div>
    </div>
  );
}
