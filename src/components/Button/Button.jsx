import styles from "./Button.module.scss";
import clsx from "clsx";

export default function Button({ title, size, isAction, onClick, className }) {
    const buttonClassName = clsx(styles.button, className,{
        [styles.small]: size === "small",
        [styles.middle]: size === "middle",
        [styles.navTweet]: size === "navTweet",
        [styles.large]: size === "large",
        [styles.action]: isAction,
        [styles.edit]: size === "edit",
    });
    return <button className={buttonClassName} onClick={onClick}>{title}</button>;
}