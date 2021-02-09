import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
function Login() {
  const [{},dispatch] = useStateValue();

  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="loginlogo"
        />
        <div className="login__text">
          <h1>sign in to watsapp</h1>
        </div>
        <Button onClick={signin}>Sign in with google</Button>
      </div>
    </div>
  );
}

export default Login;
