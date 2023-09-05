//components
import NavContainer from "components/NavContainer/NavContainer";
import SuggestUserContainer from "components/SuggestUserContainer/SuggestUserContainer";
import Header from "components/Header/Header";
import UserInfo from "../../components/UserInfo/UserInfo";

//hook
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";

//scss
import styles from "pages/UserPage/UserPage.module.scss";

//react-router-dom
import { Link, useLocation } from "react-router-dom";
import {
  UserIdLikeItem,
  UserIdReplyItem,
  UserIdTweetItem,
} from "components/UserTweetItem/UserIdTweetItem";

//api
import { getUserInfo } from "api/setting";
import { useFollow } from "contexts/FollowContext";

import Icon from '../../assets/icons/messageImage_1693886221605.jpg'

export default function UserPage() {
  const { id, tab } = useParams();
  const { isAuthenticated, currentMember } = useAuth();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldReload, setShouldReload] = useState(false);
  const [tweetCount, setTweetCount] = useState(0);
  const { followUser, unfollowUser } = useFollow();

  const handleSaveSuccess = () => {
    setShouldReload((prevState) => !prevState);
  };

  const updateTweetCount = (count) => {
    setTweetCount(count);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getUserInfo(token, id);
        setUserData(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };
    if (isAuthenticated && id) {
      fetchData();
    }
  }, [id, isAuthenticated, shouldReload, tab]);

  let content;
  switch (tab) {
    case "reply":
      content = userData ? (
        <UserIdReplyItem data={userData} userId={id} />
      ) : (
        "Loading..."
      );
      break;
    case "like":
      content = userData ? (
        <UserIdLikeItem data={userData} userId={id} />
      ) : (
        "Loading..."
      );
      break;
    default:
      content = userData ? (
        <UserIdTweetItem
          data={userData}
          userId={id}
          updateTweetCount={updateTweetCount}
        />
      ) : (
        "Loading..."
      );
  }

  const location = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <NavContainer page="user" />
      </div>
      <div className={styles.middleContainer}>
        {isLoading ? (
          <p></p>
        ) : (
          <Header title={userData.name} arrow tweetCount={tweetCount} />
        )}
        {isLoading ? (
          <img className={styles.loadingStyle} src={Icon} alt="icon"/>
        ) : (
          <UserInfo
            onSaveSuccess={handleSaveSuccess}
            isOtherUser={Number(currentMember?.id) === Number(id)}
            userData={userData}
            isFollowed={userData.isFollowed}
            Follow={followUser}
            Unfollow={unfollowUser}
          />
        )}
        <ul className={styles.link}>
          <li>
            <Link to={`/user/${id}`} className={location.pathname === `/user/${id}` ? styles.userLinkActive : styles.userLink}>推文</Link>
          </li>
          <li>
            <Link to={`/user/${id}/reply`} className={location.pathname === `/user/${id}/reply` ? styles.userLinkActive : styles.userLink}>回覆</Link>
          </li>
          <li>
            <Link to={`/user/${id}/like`} className={location.pathname === `/user/${id}/like` ? styles.userLinkActive : styles.userLink}>喜歡的內容</Link>
          </li>
        </ul>
        {content}
      </div>
      <div className={styles.suggestUserContainer}>
        <SuggestUserContainer />
      </div>
    </div>
  );
}
