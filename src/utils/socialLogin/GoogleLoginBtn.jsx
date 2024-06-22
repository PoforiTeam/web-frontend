import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";

const GoogleLoginBtn = ({ handleLogin }) => {
  const [user, setUser] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => {
      console.log(codeResponse);
      setUser(codeResponse);
    },
    onError: error => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(res => {
          console.log("동작", res);

          if (handleLogin) {
            handleLogin("google", res.data.id, res.data.name);
          }
        })
        .catch(err => {
          console.log(err);
          setUser(null);
        });
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null

  return (
    <button className="login_google" onClick={googleLogin}>
      <img src="../src/assets/img/logo/google.png" />
      Google로 로그인
    </button>
  );
};

export default GoogleLoginBtn;
