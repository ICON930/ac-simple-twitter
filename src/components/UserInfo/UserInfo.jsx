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

export default function UserInfo() {

  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }


  return (
    <div className={styles.userInfoContainer}>
      <img className={styles.banner} src={Banner} alt="default-banner" /> 
      <img className={styles.avatar} src={Avatar} alt="default-avatar" />
      <div className={styles.buttonContainer}>
        <Button 
          title="編輯個人資料"
          size="edit"
          onClick={openModal}
          isAction
        />
      </div>
        <EditModal isOpen={isOpenModal} isClose={closeModal}/>
      <div>
        <div className={styles.nameContainer}>
          <p>name</p>
          <p>@account</p>
        </div>
        <div className={styles.introContainer}>
          <p>description</p>
        </div>
        <div className={styles.followerContainer}>
          <span className={styles.number}>count 個</span><span className={styles.label}>跟隨中</span>
          <span className={styles.number}>count 位</span><span className={styles.label}>跟隨者</span>
        </div>
      </div>
    </div>
  )
}