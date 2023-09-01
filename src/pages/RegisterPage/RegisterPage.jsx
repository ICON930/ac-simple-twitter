import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

import AuthInput from "../../components/AuthInput/AuthInput.jsx";
import AuthPageContainer from "../../components/AuthPageContainer/AuthPageContainer.jsx";
import Button from "../../components/Button/Button.jsx";

import styles from "./RegisterPage.module.scss";

export default function RegisterPage() {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");

  const { register } = useAuth();

  const navigate = useNavigate();

  const handleClick = async () => {
    if (account.length === 0) {
      return;
    }
    if (name.length === 0) {
      return;
    }
    if (email.length === 0) {
      return;
    }
    if (password.length === 0) {
      return;
    }
    if (checkPassword.length === 0) {
      return;
    }

    const success = await register({
      account,
      name,
      email,
      password,
      checkPassword,
    });
    console.log(success)
    if (success.status === "success") {
      Swal.fire({
        position: "top",
        title: "註冊成功！",
        timer: 1000,
        icon: "success",
        showConfirmButton: false,
      });
      navigate("/login");
      return;
    }
    Swal.fire({
      position: "top",
      title: "註冊失敗！",
      text: success.response.data.message,
      timer: 1000,
      icon: "error",
      showConfirmButton: false,
    });
    return;
  };

  return (
    <AuthPageContainer title="建立你的帳號">
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
        placeholder="請輸入使用者名稱"
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
        type="password"
        placeholder="請設定密碼"
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        notification="字數超出上限!"
        wordsLimit={20}
      />
      <AuthInput
        label="密碼確認"
        value={checkPassword}
        type="password"
        placeholder="請再次輸入密碼"
        onChange={(checkPasswordInputValue) =>
          setCheckPassword(checkPasswordInputValue)
        }
        notification="字數超出上限!"
        wordsLimit={20}
      />
      <Button title="註冊" size="large" isAction onClick={handleClick}></Button>
      <div className={styles.link}>
        <NavLink to={"/login"}>
          <span className={styles.span}>取消</span>
        </NavLink>
      </div>
    </AuthPageContainer>
  );
}
