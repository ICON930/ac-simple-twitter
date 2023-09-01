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
export default function FollowerPage() {
  const { isAuthenticated, currentMember } = useAuth();
  const token = localStorage.getItem("token");
  const { id, tab } = useParams(); // 從 URL 中取得 id 和 tab 參數
  const [userData, setUserData] = useState([]);
  const [hasNoFollowers, setHasNoFollowers] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          let response;
          if (tab === "follower") {
            response = await getFollower(token, id);
          } else if (tab === "followings") {
            response = await getFollowing(token, id);
            if (response && response.status === "success") {
              setHasNoFollowers(true);
              setUserData([]); // 設置為空陣列
            } else {
              setHasNoFollowers(false);
            }
          }
          const responseData = response.data || [];
          setUserData(responseData);
        } catch (error) {
          console.log("[Fetching data failed]", error);
          setUserData([]);
        }
      };
      fetchData();
    }
  }, [isAuthenticated, token, id, tab]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.navContainer}>
          <NavContainer page="user" />
        </div>
        <div className={styles.middleContainer}>
          <div className={styles.header}>
            <Header
              title={currentMember.name}
              arrow
              tweetCount={currentMember.tweetCount}
            />
          </div>
          <div className={styles.followTable}>
            <ul>
              <li>
                <Link to={`/users/${id}/follower`}>追隨者</Link>
              </li>
              <li>
                <Link to={`/users/${id}/followings`}>正在追隨中</Link>
              </li>
            </ul>
          </div>
          <div className={styles.followList}>
            {hasNoFollowers ? (
              <p>
                {tab === "follower"
                  ? "使用者無追隨者!"
                  : "使用者無正在追隨的對象!"}
              </p>
            ) : (
              userData.map((item) =>
                tab === "follower" ? (
                  <FollowerList
                    key={item}
                    avatar={item.avatar}
                    name={item.name}
                    introduction={item.introduction}
                  />
                ) : (
                  <FollowingList
                    key={item}
                    avatar={item.avatar}
                    name={item.name}
                    introduction={item.introduction}
                  />
                )
              )
            )}
          </div>
        </div>
        <div className="sugContainer">
          <SuggestUserContainer />
        </div>
      </div>
    </div>
  );
}
