import { NavLink } from "react-router-dom";
import arrowIcon from '../../assets/icons/back-arrow-icon.svg';
import styles from "./Header.module.scss";

export default function Header({ title, arrow, tweetCount }) {
    return (
        <div className={styles.container}>
            {arrow && tweetCount ? (
                <div>
                    <div className={styles.headerContainer}>
                        <NavLink to="/main">
                            <div className={styles.arrow}>
                                <img src={arrowIcon} alt="arrow" />
                            </div>
                        </NavLink>
                        <div className={styles.titleContainer}>
                            <h5 className={styles.smallTitle}>{title}</h5>
                            <p className={styles.tweetCount}>23推文</p>
                        </div>
                    </div>
                </div>
            ) : arrow ? (
                <div>
                    <div className={styles.headerContainer}>
                        <NavLink to="/main">
                            <div className={styles.arrow}>
                                <img src={arrowIcon} alt="arrow" />
                            </div>
                        </NavLink>
                        <div>
                            <h4 className={styles.title}>{title}</h4>
                        </div>
                    </div>
                </div>
            ) : (
                <h4 className={styles.title}>{title}</h4>
            )}
        </div>
    );
}