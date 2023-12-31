import clsx from "clsx";
import styles from "./AuthInput.module.scss";

export default function AuthInput({
  label,
  type,
  value,
  placeholder,
  onChange,
  notification,
  wordsLimit,
  onKeyUp,
}) {
  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>{label}</label>
        <input
          className={clsx(styles.input, {
            [styles.active]: 
              value.length > wordsLimit ||
              notification === "帳號不存在！" ||
              notification === "Error: email已重複註冊！" ||
              notification === "Error: account已重複註冊！" ,
          })}
          type={type || "text"}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange?.(event.target.value)}
          onKeyUp={onKeyUp}
        />
      </div>
      <div className={styles.noteBox}>
        <div
          className={clsx(styles.notification, {
            [styles.active]:
              value.length > wordsLimit ||
              notification === "帳號不存在！" ||
              notification === "Error: email已重複註冊！" ||
              notification === "Error: account已重複註冊！",
          })}
        >
          {notification}
        </div>
        <span
          className={clsx(styles.count, { [styles.active]: value.length > 0 })}
        >
          {value.length}/{wordsLimit}
        </span>
      </div>
    </>
  );
}
