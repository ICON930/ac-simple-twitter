import { useState } from "react";
import { NavLink } from "react-router-dom";

import AuthInput from "../../components/AuthInput/AuthInput.jsx";
import AuthPageContainer from "../../components/AuthPageContainer/AuthPageContainer.jsx";
import Button from "../../components/Button/Button.jsx";

import styles from "./RegisterPage.module.scss";

export default function RegisterPage () {
  const [ account, setAccount ] = useState("");
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ checkPassword, setCheckPassword ] = useState("");

  return (
    <AuthPageContainer title="建立你的帳號">
      <AuthInput label="帳號" value={account} placeholder="請輸入帳號" onChange={(accountInputValue) => setAccount(accountInputValue)}
      notification="字數超出上限!" wordsLimit={50}
      />
      <AuthInput label="名稱" value={name} placeholder="請輸入使用者名稱" onChange={(nameInputValue) => setName(nameInputValue)}
      notification="字數超出上限!" wordsLimit={50}
      />
      <AuthInput label="Email" value={email} placeholder="請輸入Email" onChange={(emailInputValue) => setEmail(emailInputValue)}
      notification="字數超出上限!" wordsLimit={100}
      />
      <AuthInput label="密碼" value={password} placeholder="請設定密碼" onChange={(passwordInputValue) => setPassword(passwordInputValue)}
      notification="字數超出上限!" wordsLimit={20}
      />
      <AuthInput label="密碼確認" value={checkPassword} placeholder="請再次輸入密碼" onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
      notification="字數超出上限!" wordsLimit={20}
      />
      <Button title="登入" size="large" isAction></Button>
      <div className={styles.link}>
        <NavLink to={"/login"}>
          <span className={styles.span}>取消</span>
        </NavLink>
      </div>
    </AuthPageContainer>
  );
}