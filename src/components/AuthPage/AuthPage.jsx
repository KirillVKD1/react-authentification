import React, { useContext } from "react";
import { API } from "../../api";
import { useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import styles from "./AuthPage.module.css";

const AuthPage = (props) => {
  let [emailValue, setEmailValue] = useState();
  let [passwordValue, setPasswordValue] = useState();

  const auth = useContext(AuthContext); 

  const userNotification = (value) =>
    props.toast.info(`${value}`, props.toastInf);

  const login = async () => {
    const resAuth = await API.authMe(emailValue, passwordValue);
    auth.login( 
      resAuth.data.token,
      resAuth.data.userId,
      resAuth.data.userEmail
    ); 
    
    
    //props.onChangeTasks();
    userNotification("Login successfully");
  };

  const signUp = async () => {
    await API.singUpPost(emailValue, passwordValue);
    userNotification("User created"); 
    login();
  };

  return (
    <>
      <div className={styles.inputFlex}>
        <div className={styles.authInputArea}>
          <input
            className={styles.authInput}
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}
            onKeyPress={(e) => (e.charCode === 13 ? login() : null)}
            type="email"
            placeholder="email:"
          />
        </div>
        <div className={styles.authInputArea}>
          {" "}
          <input
            className={styles.authInput}
            onChange={(e) => setPasswordValue(e.target.value)}
            value={passwordValue}
            onKeyPress={(e) => (e.charCode === 13 ? login() : null)}
            placeholder="password:"
          />
        </div>
      </div>
      <button onClick={() => login()} className={styles.authAction}>
        Login
      </button>
      <button onClick={() => signUp()} className={styles.authAction}>
        SingUp
      </button>
    </>
  );
};
export default AuthPage;
