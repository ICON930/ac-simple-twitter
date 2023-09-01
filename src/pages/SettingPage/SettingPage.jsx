import styles from "./SettingPage..module.scss";
import { useState } from "react";
import NavContainer from "components/NavContainer/NavContainer";
import Header from "components/Header/Header";
import AuthInput from "components/AuthInput/AuthInput";
import Button from "components/Button/Button";
import { useAuth } from "contexts/AuthContext";
import { settingPage } from "api/setting";
import Swal from "sweetalert2";

export default function Setting() {
  const { isAuthenticated, currentMember, token } = useAuth();
  const [account, setAccount] = useState(currentMember.account);
  const [name, setName] = useState(currentMember.name);
  const [email, setEmail] = useState(currentMember.email);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleSaveClick = async (token, id) => {
    try {
      console.log("Token:", token);
      const success = await settingPage(token, currentMember.id, {
        account,
        name,
        email,
        password,
        passwordCheck,
      });

      if (success.status === "success") {
        Swal.fire({
          position: "top",
          title: "設定已更新。",
          timer: 1000,
          icon: "success",
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          position: "top",
          title: "設定更新失敗。",
          timer: 1000,
          icon: "error",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log("[API error]", error);
      Swal.fire({
        position: "top",
        title: "發生錯誤，請稍後再試。",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

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
            type="password"
            onChange={(passwordInputValue) => setPassword(passwordInputValue)}
            notification="字數超出上限!"
            wordsLimit={20}
          />
          <AuthInput
            label="密碼確認"
            value={passwordCheck}
            placeholder="請再次輸入密碼"
            type="password"
            onChange={(passwordCheckInputValue) =>
              setPasswordCheck(passwordCheckInputValue)
            }
            notification="字數超出上限!"
            wordsLimit={20}
          />
        </div>
        <div className={styles.button}>
          <Button
            title="儲存"
            size="small"
            isAction
            onClick={handleSaveClick}
          />
        </div>
      </div>
    </div>
  );
}
