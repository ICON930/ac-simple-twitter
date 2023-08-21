import clsx from "clsx";
import styles from "./NavItem.module.scss";

export default function NavItem({ iconStyle, altName, title, isActive }) {
    return (
        <div className={styles.container}>
            <div className={styles.iconStyle}>
                <img className={clsx(styles[iconStyle], { [styles.activeIcon]: isActive })} alt={altName} />
            </div>
            <div className={clsx(styles.title, { [styles.activeTitle]: isActive })}>{title}</div>
        </div>
    );
}