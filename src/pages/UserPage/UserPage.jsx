//components
import NavContainer from "components/NavContainer/NavContainer";
import SuggestUserContainer from "components/SuggestUserContainer/SuggestUserContainer";
import Header from "components/Header/Header";
import UserInfo from "../../components/UserInfo/UserInfo"

//hook
import { useParams } from "react-router-dom"

//scss
import styles from "pages/UserPage/UserPage.module.scss"

//react-router-dom
import { Link } from "react-router-dom";
import { UserLikeItem, UserReplyItem, UserTweetItem } from "components/UserTweetItem/UserTweetItem";

export default function UserPage() {
  const { tab } = useParams();

  let content;
  switch(tab) {
    case "reply":
      content = <UserReplyItem />;
      break;
    case "like":
      content = <UserLikeItem />;
      break;
    default:
      content = <UserTweetItem />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}> 
        <NavContainer page="user" />  
      </div>
      <div className={styles.middleContainer}> 
        <Header 
          className={styles.header}
          title="John Doe" 
          arrow 
          tweetCount 
        />
        <UserInfo />
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
