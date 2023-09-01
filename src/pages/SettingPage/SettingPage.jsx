import styles from "./SettingPage..module.scss";
import { useState, useEffect } from "react";
import NavContainer from "components/NavContainer/NavContainer";
import Header from "components/Header/Header";
import AuthInput from "components/AuthInput/AuthInput";
import Button from "components/Button/Button";

import { useAuth } from "contexts/AuthContext";
import { settingPage } from "api/setting";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
export default function Setting() {
  const { isAuthenticated, currentMember } = useAuth();
  const token = localStorage.getItem("token");
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const navigate = useNavigate();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    if (!isPageLoaded) {
      // 進入頁面時，讀取一次資料
      if (isAuthenticated && currentMember) {
        setAccount(currentMember.account);
        setName(currentMember.name);
        setEmail(currentMember.email);
        setIsPageLoaded(true); // 設置 flag，避免重複讀取
        console.log();
      }
    }
  }, [isAuthenticated, currentMember, isPageLoaded]);

  const handleChange = async () => {
    const success = await settingPage(token, currentMember.id, {
      account,
      name,
      email,
      password,
      checkPassword,
    });
    console.log(success);
    if (success.status === "success") {
      setAccount(account);
      setName(name);
      setEmail(email);

      Swal.fire({
        position: "top",
        title: "變更成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      navigate("/setting");
    } else {
      Swal.fire({
        position: "top",
        title: "變更失敗！",
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
            value={checkPassword}
            placeholder="請再次輸入密碼"
            type="password"
            onChange={(checkPasswordInputValue) =>
              setCheckPassword(checkPasswordInputValue)
            }
            notification="字數超出上限!"
            wordsLimit={20}
          />
        </div>
        <div className={styles.button}>
          <Button title="儲存" size="small" isAction onClick={handleChange} />
        </div>
      </div>
    </div>
  );
}
