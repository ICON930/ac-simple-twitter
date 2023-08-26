import styles from "./SettingPage..module.scss";
import { useState } from "react";
import NavContainer from "components/NavContainer/NavContainer";
import Header from "components/Header/Header";
import AuthInput from "components/AuthInput/AuthInput";
import Button from "components/Button/Button";
export default function Setting() {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  return (
    <div className={`${styles.container} container max-auto`}>
      <div className={styles.navContainer}>
        <NavContainer page="user" />
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.header}>
          <Header title="帳戶設定" />
        </div>
        <div className={styles.input}>
          <AuthInput
            label="帳號"
            value={account}
            placeholder="請輸入帳號"
            onChange={(accountInputValue) => setAccount(accountInputValue)}
            notification="字數超出上限!"
            wordsLimit={50}
          />
          <AuthInput
            label="名稱"
            value={name}
            placeholder="請輸入名稱"
            onChange={(nameInputValue) => setName(nameInputValue)}
            notification="字數超出上限!"
            wordsLimit={50}
          />
          <AuthInput
            label="Email"
            value={email}
            placeholder="請輸入Email"
            onChange={(emailInputValue) => setEmail(emailInputValue)}
            notification="字數超出上限!"
            wordsLimit={100}
          />
          <AuthInput
            label="密碼"
            value={password}
            placeholder="請設定密碼"
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
            notification="字數超出上限!"
            wordsLimit={20}
          />
          <AuthInput
            label="密碼確認"
            value={checkPassword}
            placeholder="請再次輸入密碼"
            onChange={(checkPasswordInputValue) =>
              setCheckPassword(checkPasswordInputValue)
            }
            notification="字數超出上限!"
            wordsLimit={20}
          />
        </div>
        <div className={styles.button}>
          <Button title="儲存" size="small" isAction />
        </div>
      </div>
    </div>
  );
}
