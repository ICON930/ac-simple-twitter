//components
import Header from "../../components/Header/Header";
import NavContainer from "components/NavContainer/NavContainer";
import SuggestUserContainer from "components/SuggestUserContainer/SuggestUserContainer";
import {
  FollowerList,
  FollowingList,
} from "components/FollowList/FollowerList";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//scss
import styles from "./FollowerPage.module.scss";

//api
import { getFollower, getFollowing } from "api/follow";
import { useAuth } from "contexts/AuthContext";
import { useFollow } from "contexts/FollowContext";
export default function FollowerPage({ followerId, followingId }) {
  const { isAuthenticated, currentMember } = useAuth();
  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState([]);
  const [hasNoFollowers, setHasNoFollowers] = useState(false);
  const { followUser, unfollowUser } = useFollow();
  const { id, tab } = useParams();

  useEffect(() => {
    if (isAuthenticated && id !== null && currentMember !== null) {
      const fetchData = async () => {
        try {
          let response;
          if (tab === "follower") {
            response = await getFollower(token, id);
          } else if (tab === "followings") {
            response = await getFollowing(token, id);
            if (response && response.status === "success") {
              setHasNoFollowers(true);
              setUserData([]);
            } else {
              setHasNoFollowers(false);
              setUserData([]);
            }
          }
          console.log("API response:", response);
          setUserData(response);
        } catch (error) {
          console.log("[Fetching data failed]", error);
          setUserData([]);
        }
      };
      fetchData();
    }
  }, [isAuthenticated, token, id, tab, currentMember]);
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.navContainer}>
          <NavContainer page="user" />
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.header}>
            <Header
              title={currentMember?.name}
              arrow
              tweetCount={currentMember?.tweetCount}
            />
          </div>
          <div className={styles.followTable}>
            <ul>
              <li>
                <Link
                  to={`/users/${id}/follower`}
                  className={styles.followLink}
                >
                  追隨者
                </Link>
              </li>
              <li>
                <Link
                  to={`/users/${id}/followings`}
                  className={styles.followLink}
                >
                  正在追隨中
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.followList}>
            {tab === "follower" ? (
              hasNoFollowers ? (
                <p>目前沒有追隨者</p>
              ) : (
                userData.map((item) => {
                  return (
                    <FollowerList
                      key={item.id}
                      avatar={item.avatar}
                      name={item.name}
                      introduction={item.introduction}
                      isFollowed={item.isFollowed}
                      followerId={item.followerId}
                      Follow={followUser}
                      Unfollow={unfollowUser}
                    />
                  );
                })
              )
            ) : hasNoFollowers ? (
              <p>目前沒有正在追蹤</p>
            ) : (
              userData.map((item) => {
                return (
                  <FollowingList
                    key={item.id}
                    avatar={item.avatar}
                    name={item.name}
                    introduction={item.introduction}
                    isFollowed={item.isFollowed}
                    followingId={item.followingId}
                    Follow={followUser}
                    Unfollow={unfollowUser}
                  />
                );
              })
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
