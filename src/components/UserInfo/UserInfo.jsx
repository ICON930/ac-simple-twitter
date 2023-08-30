//components 
import Button from "components/Button/Button"

//hook
import { useState } from "react"

//scss
import styles from "./UserInfo.module.scss"

//icon
import Banner from "../../assets/icons/default-banner.svg"
import Avatar from "../../assets/icons/default-avatar.svg"
import EditModal from "components/Modal/EditModal"
import Ball from "../../assets/icons/noti-Icon.svg"

export default function UserInfo({ isOtherUser, userData, onSaveSuccess }) {

  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }
  console.log(userData)

  return (
    <div className={styles.userInfoContainer}>
      <img className={styles.banner} src={userData.cover} height="200px" width="634px" alt="default-banner" /> 
      <img className={styles.avatar} src={userData.avatar} alt="default-avatar" />
      {isOtherUser && <img className={styles.ballStyle} src={Ball} alt="ball"/>}
      {isOtherUser && <img className={styles.ballStyleTwo} src={Ball} alt="ball"/>}  
      <div className={styles.buttonContainer}>
        <Button 
          title={isOtherUser? "正在跟隨" : "編輯個人資料"}
          size={isOtherUser? "middle" : "edit"}
          onClick={openModal}
          isAction
          className={isOtherUser && styles.buttonClass }
        />
      </div>
        <EditModal onSaveSuccess={onSaveSuccess} isOpen={isOpenModal} isClose={closeModal} userData={userData}/>
      <div>
        <div className={styles.nameContainer}>
          <p>{userData.name}</p>
          <p>@{userData.account}</p>
        </div>
        <div className={styles.introContainer}>
          <p>{userData.introduction}</p>
        </div>
        <div className={styles.followerContainer}>
          <span className={styles.number}>{userData.followingsCount} 個</span>
          <span className={styles.label}>跟隨中</span>
          <span className={styles.number}>{userData.followingsCount} 位</span>
          <span className={styles.label}>跟隨者</span>
        </div>
      </div>
    </div>
  )
}