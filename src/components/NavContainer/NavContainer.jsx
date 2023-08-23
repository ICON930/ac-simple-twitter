import { NavLink } from "react-router-dom";

import NavItem from "../NavItem/NavItem.jsx";
import Button from "../Button/Button.jsx";
import logo from "../../assets/icons/logo-Icon.svg";
import logoutImg from "../../assets/icons/logout-Icon.svg";

import styles from "./NavContainer.module.scss";

export default function NavContainer({ page }) {
  return (
    <div className={styles.container}>
      <img className={styles.logoImg} src={logo} alt="logo" />
      <div className={styles.main}>
        {page === "user" && (
          <>
            <div className={styles.menu}>
              <NavLink to="/main">
                <NavItem iconStyle={"iconHome"} altName="main" title="首頁" />
              </NavLink>
              <NavLink to="/user/:UserId/tweet" className={styles.btnLink}>
                <NavItem
                  iconStyle={"iconUser"}
                  altName="user"
                  title="個人資料"
                />
              </NavLink>
              <NavLink to="/setting" className={styles.btnLink}>
                <NavItem
                  iconStyle={"iconSetting"}
                  altName="setting"
                  title="設定"
                />
              </NavLink>
            </div>
            <div className={styles.btn}>
              <Button title="推文" size="navTweet" isAction></Button>
            </div>
          </>
        )}
        {page === "admin" && (
          <div className={styles.menu}>
            <NavLink to="/admin/main">
              <NavItem iconStyle={"iconHome"} altName="main" title="推文清單" />
            </NavLink>
            <NavLink to="/admin/users">
              <NavItem
                iconStyle={"iconUser"}
                altName="user"
                title="使用者列表"
              />
            </NavLink>
          </div>
        )}
      </div>
      <div className={styles.logout}>
        <img className={styles.logoutImg} src={logoutImg} alt="log-out" />
        <h5 className={styles.btnName}>登出</h5>
      </div>
    </div>
  );
}
