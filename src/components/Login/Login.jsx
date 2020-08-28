import React from "react";
import { API } from "../../api";
import { useState } from "react";

const Login = (props) => {
  let [emailValue, setEmailValue] = useState();
  let [passwordValue, setPasswordValue] = useState();

  const signUp = async () => {
    let response = await API.singUpPost(emailValue, passwordValue); 

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
      </div>
    </div>
  );
};

export default Login;
