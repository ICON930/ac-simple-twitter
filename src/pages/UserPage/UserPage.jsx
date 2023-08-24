//components
import NavContainer from "components/NavContainer/NavContainer";
import SuggestUserContainer from "components/SuggestUserContainer/SuggestUserContainer";
import Header from "components/Header/Header";
import UserInfo from "../../components/UserInfo/UserInfo"

//scss
import styles from "pages/UserPage/UserPage.module.scss"
import { Link } from "react-router-dom";

export default function UserPage() {
  return (
    <div className={styles.container}>
      <div className={styles.navContainer}> 
        <NavContainer page="user" />  
      </div>
      <div className={styles.middleContainer}> 
        <Header 
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
      </div>
      <div className={styles.suggestUserContainer}> 
        <SuggestUserContainer />
      </div>
    </div>
  )
  }