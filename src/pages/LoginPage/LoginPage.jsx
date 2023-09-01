import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext.jsx";
import Swal from "sweetalert2";

import AuthInput from "../../components/AuthInput/AuthInput.jsx";
import AuthPageContainer from "../../components/AuthPageContainer/AuthPageContainer.jsx";
import Button from "../../components/Button/Button.jsx";

import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }

    const success = await login({
      account,
      password,
    });
    if (success) {
      Swal.fire({
        position: "top",
        title: "登入成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      navigate("/main");
      return;
    }
    Swal.fire({
      position: "top",
      title: "登入失敗！",
      timer: 1000,
      icon: "error",
      showConfirmButton: false,
    });
  };

  return (
    <AuthPageContainer title="登入 Alphitter">
      <AuthInput
        label="帳號"
        value={account}
        placeholder="請輸入帳號"
        onChange={(accountInputValue) => setAccount(accountInputValue)}
        notification="字數超出上限!"
        wordsLimit={50}
      />
      <AuthInput
        label="密碼"
        value={password}
        type="password"
        placeholder="請輸入密碼"
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        notification="字數超出上限!"
        wordsLimit={20}
      />
      <Button title="登入" size="large" isAction onClick={handleClick}></Button>
      <div className={styles.link}>
        <NavLink to={"/register"}>
          <span className={styles.span}>註冊</span>
        </NavLink>
        <span>・</span>
        <NavLink to={"/admin/login"}>
          <span className={styles.span}>後台登入</span>
        </NavLink>
      </div>
    </AuthPageContainer>
  );
}
