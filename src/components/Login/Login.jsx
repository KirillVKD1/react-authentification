import React, { useContext } from "react";
import { API } from "../../api";
import { useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const Login = (props) => {
  let [emailValue, setEmailValue] = useState();
  let [passwordValue, setPasswordValue] = useState(); 
  const auth = useContext(AuthContext);

  const userCreatedNotification = (value) =>
    props.toast.info(`${value}`, props.toastInf);

  const signUp = async () => {
    let response = await API.singUpPost(emailValue, passwordValue);
    userCreatedNotification(response.data.message);
    debugger;
  };
  const login = async () => {debugger
    let response = await API.authMe(emailValue, passwordValue); 
    auth.login(response.data.token, response.data.userId);
   // if (response.data.auth) {
    //  props.setToken(true);
  };

  return (
    <div className="login">
      <div className="login-inputs">
        <div>email: </div>
        <input
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
          type="text"
        />
      </div>
      <div className="login-inputs">
        <div>Password: </div>
        <input
          onChange={(e) => setPasswordValue(e.target.value)}
          value={passwordValue}
          type="text"
        />
      </div>
      <div>
        <button onClick={() => signUp()}>Sign Up</button>
        <button onClick={() => login()}>LOGIN!!!!!!!!!</button>
      </div>
    </div>
  );
};

export default Login;
