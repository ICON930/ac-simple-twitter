import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import NavItem from "../NavItem/NavItem.jsx";
import Button from "../Button/Button.jsx";
import TweetModal from "../Modal/TweetModal.jsx";
import { useAuth } from "contexts/AuthContext.jsx";
import logo from "../../assets/icons/logo-Icon.svg";
import logoutImg from "../../assets/icons/logout-Icon.svg";

//api

import styles from "./NavContainer.module.scss";

export default function NavContainer({ page }) {
  const { currentMember } = useAuth();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { logout } = useAuth();
  const openModal = () => {
    console.log("Modal is opening");
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };
  const handleClick = () => {
    logout();
  };

  const id = currentMember?.id;

  const location = useLocation()

  return (
    <div className={styles.container}>
      <img className={styles.logoImg} src={logo} alt="logo" />
      <div className={styles.main}>
        {page === "user" && (
          <>
            <div className={styles.menu}>
              <NavLink to="/main">
                <NavItem iconStyle={"iconHome"} altName="main" title="首頁" isActive={location.pathname === "/main"} />
              </NavLink>
              <NavLink to={`/user/${id}`}>
                <NavItem
                  iconStyle={"iconUser"}
                  altName="user"
                  title="個人資料"
                  isActive={location.pathname === `/user/${id}`} 
                />
              </NavLink>
              <NavLink to="/setting">
                <NavItem
                  iconStyle={"iconSetting"}
                  altName="setting"
                  title="設定"
                  isActive={location.pathname === '/setting'} 
                />
              </NavLink>
            </div>
            <div className={styles.btn}>
              <Button
                onClick={openModal}
                title="推文"
                size="navTweet"
                isAction
              />
              {isOpenModal && (
                <TweetModal isOpen={isOpenModal} onClose={closeModal} />
              )}
            </div>
          </>
        )}
        {page === "admin" && (
          <div className={styles.menu}>
            <NavLink to="/admin/main">
              <NavItem iconStyle={"iconHome"} altName="main" title="推文清單" isActive={location.pathname === "/admin/main"} />
            </NavLink>
            <NavLink to="/admin/users">
              <NavItem
                iconStyle={"iconUser"}
                altName="user"
                title="使用者列表"
                isActive={location.pathname === "/admin/users"}
              />
            </NavLink>
          </div>
        )}
      </div>
      <div className={styles.logout} onClick={handleClick}>
        <img className={styles.logoutImg} src={logoutImg} alt="log-out" />
        <h5 className={styles.btnName}>登出</h5>
      </div>
    </div>
  );
}
