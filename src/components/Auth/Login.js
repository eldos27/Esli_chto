import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import {  useHistory } from "react-router-dom";
import "./Auth.css";
import { authContext } from "./AuthContextProvider";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    handleSignUp,
    passwordError,
    handleLogin,
    hasAccount,
    setHasAccount,
    user,
  } = useContext(authContext);

  const history = useHistory();

  const handleSignIn = async () => {
    try {
      await handleLogin();
      history.push("/");
    } catch {
      return alert("Заполните верно формы");
    }
  };

  const handleRegist = async () => {
    try {
      await handleSignUp();
      history.push("/");
    } catch {
      return alert("Заполните верно формы");
    }
  };
  return (
    <section className="login">
      <div className="loginContainer">
        <label>Имя пользователя</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>Пароль</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSignIn}
              >
                Войти
              </Button>

              <p>
                Нет учетной записи?
                <Button onClick={() => setHasAccount(!hasAccount)}>
                  Зарегистрироваться
                </Button>
              </p>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRegist}
              >
                Регистрация
              </Button>

              <p>
                Уже есть аккаунт?
                <Button onClick={() => setHasAccount(!hasAccount)}>
                  Войти
                </Button>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
