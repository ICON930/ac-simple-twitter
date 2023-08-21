import logo from "../../assets/icons/logo-Icon.svg";
import styles from "./AuthPageContainer.module.scss";

export default function AuthPageContainer ({children, title}) {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="AC logo" />
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.AuthInputContainer}>
        {children}
      </div>
    </div>
  )
}