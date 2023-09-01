import clsx from "clsx";
import styles from "./AuthInput.module.scss";

export default function AuthInput ({ label, type, value, placeholder, onChange, notification, wordsLimit,}) {
  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>{label}</label>
        <input
          className={clsx(styles.input, { [styles.active]: value.length > wordsLimit })} 
          type={type || "text"}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
        />
      </div>
      <div className={styles.noteBox}>
        <div className={clsx(styles.notification, { [styles.active]: value.length > wordsLimit || notification === "帳號不存在！"})}>
          {notification}
        </div>
        <span className={clsx(styles.count, { [styles.active]: value.length > 0 })}>{value.length}/{wordsLimit}</span>
      </div>
    </>
  )
}