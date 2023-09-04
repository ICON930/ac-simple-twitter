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
import { Link } from "react-router-dom";
import {
  UserIdLikeItem,
  UserIdReplyItem,
  UserIdTweetItem,
} from "components/UserTweetItem/UserIdTweetItem";

//api
import { getUserInfo } from "api/setting";
import { useFollow } from "contexts/FollowContext";
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

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <NavContainer page="user" />
      </div>
      <div className={styles.middleContainer}>
        {isLoading ? (
          "Loading..."
        ) : (
          <Header title={userData.name} arrow tweetCount={tweetCount} />
        )}
        {isLoading ? (
          "Loading..."
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
            <Link to={`/user/${id}`} className={styles.userLink}>推文</Link>
          </li>
          <li>
            <Link to={`/user/${id}/reply`} className={styles.userLink}>回覆</Link>
          </li>
          <li>
            <Link to={`/user/${id}/like`} className={styles.userLink}>喜歡的內容</Link>
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
