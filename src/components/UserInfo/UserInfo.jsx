//components
import Button from "components/Button/Button";

//hook
import { useState } from "react";
import { Link } from "react-router-dom";
//scss
import styles from "./UserInfo.module.scss";

//icon
import Banner from "../../assets/icons/default-banner.svg";
import Avatar from "../../assets/icons/default-avatar.svg";
import EditModal from "components/Modal/EditModal";
import Ball from "../../assets/icons/noti-Icon.svg";

export default function UserInfo({ isOtherUser, userData, onSaveSuccess }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false); 

  const handleFollow = () => {

  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={styles.userInfoContainer}>
      <img
        className={styles.banner}
        src={userData.cover || Banner}
        height="200px"
        width="634px"
        alt="default-banner"
      />
      <img
        className={styles.avatar}
        src={userData.avatar || Avatar}
        alt="default-avatar"
      />
      {isOtherUser && (
        <img className={styles.ballStyle} src={Ball} alt="ball" />
      )}
      {isOtherUser && (
        <img className={styles.ballStyleTwo} src={Ball} alt="ball" />
      )}
      <div className={styles.buttonContainer}>
        <Button
          title={isOtherUser ? (isFollowing ? "正在跟隨" : "跟隨") : "編輯個人資料"}
          size={isOtherUser ? (isFollowing ? "middle" : "small") : "edit"}
          onClick={isOtherUser ? handleFollow : openModal}
          isAction={isOtherUser ? (isFollowing? "isAction" : "") : "isAction"}
          className={isOtherUser ? (isFollowing? styles.buttonClass : styles.buttonSmall ) : styles.buttonClass}
        />
      </div>
      <EditModal
        onSaveSuccess={onSaveSuccess}
        isOpen={isOpenModal}
        isClose={closeModal}
        userData={userData}
      />
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
          <Link to={`/users/${userData.id}/followings`}>
            <span className={styles.label}>跟隨中</span>
          </Link>
          <span className={styles.number}>{userData.followersCount} 位</span>
          <Link to={`/users/${userData.id}/follower`}>
            <span className={styles.label}>跟隨者</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
