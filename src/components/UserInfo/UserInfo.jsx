//components 
import Button from "components/Button/Button"

//scss
import styles from "./UserInfo.module.scss"

//icon
import Banner from "../../assets/icons/default-banner.svg"
import Avatar from "../../assets/icons/default-avatar.svg"

export default function UserInfo() {
  const handleClick = () => {
  }

  return (
    <div className={styles.container}>
      <img className={styles.banner} src={Banner} alt="default-banner" /> 
      <img className={styles.avatar} src={Avatar} alt="default-avatar" />
      <div className={styles.button}>
        <Button 
          title="編輯個人資料"
          size="edit"
          onClick={handleClick}
          isAction
        />
      </div>
      <div>
        <div className={styles.nameContainer}>
          <p>John Doe</p>
          <p>@heyjohn</p>
        </div>
        <div className={styles.introContainer}>
          <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
        </div>
        <div className={styles.followerContainer}>
          <span className={styles.number}>34 個</span><span className={styles.label}>跟隨中</span>
          <span className={styles.number}>59 位</span><span className={styles.label}>跟隨者</span>
        </div>
      </div>
    </div>
  )
}