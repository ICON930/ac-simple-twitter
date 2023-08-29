//components
import NavContainer from "components/NavContainer/NavContainer";
import SuggestUserContainer from "components/SuggestUserContainer/SuggestUserContainer";
import Header from "components/Header/Header";
import UserInfo from "../../components/UserInfo/UserInfo"

//hook
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";

//scss
import styles from "pages/UserPage/UserPage.module.scss"

//react-router-dom
import { Link } from "react-router-dom";
import { UserLikeItem, UserReplyItem, UserTweetItem } from "components/UserTweetItem/UserTweetItem";

//api
import { getUserInfo } from "api/setting";

export default function UserPage() {
  const { id, tab } = useParams();
  const { isAuthenticated, currentMember} = useAuth()
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const data = await getUserInfo(token, id)
        setUserData(data)
        setIsLoading(false)
      } catch (error) {
        console.log('Error fetching user data',error)
      }
    }
    if (isAuthenticated && id) {
      fetchData()
    }
   },[id, isAuthenticated])

  let content
  switch(tab) {
    case "reply":
      content = userData ? <UserReplyItem data={userData} /> : "Loading...";
      break;
    case "like":
      content = userData ? <UserLikeItem data={userData} /> :
       "Loading...";
      break;
    default:
      content = userData ? <UserTweetItem data={userData} /> : "Loading...";
  }

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}> 
        <NavContainer page="user" />  
      </div>
      <div className={styles.middleContainer}> 
        {isLoading ? "Loading..." : <Header 
          title={userData.name}
          arrow
          tweetCount 
        />}
        {isLoading ? "Loading..." : <UserInfo isOtherUser={Number(currentMember?.id) !== Number(id)}  userData={userData} />}
        <ul className={styles.link}>
          <li><Link to="/user">推文</Link></li>
          <li><Link to="/user/reply">回覆</Link></li>
          <li><Link to="/user/like">喜歡的內容</Link></li>
        </ul>
        {content}
      </div>
      <div className={styles.suggestUserContainer}> 
        <SuggestUserContainer />
      </div>
    </div>
    )
  }
