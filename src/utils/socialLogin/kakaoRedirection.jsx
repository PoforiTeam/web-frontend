import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI, getKakaoLoginData } from "./KakaoLoginBtn";
import { useLogin } from "../../api/hooks/useAuth";

const KakaoRedirection = () => {
  const loginMutation = useLogin();
  const handleLogin = (socialType, socialId, name) => {
    loginMutation.mutate({ socialType, socialId, name });
  };
  const navigate = useNavigate();
  const getToken = async () => {
    const kakao_token = new URL(window.location.href).searchParams.get("code");
    const res = axios.post(
      "https://kauth.kakao.com/oauth/token",
      {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: kakao_token,
      },
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    return res;
  };

  useEffect(() => {
    getToken()
      .then(res => {
        if (res) {
          const kakao_token = res.data.access_token;
          if (kakao_token) {
            getKakaoLoginData(kakao_token)
              .then(data => {
                console.log(data);
                handleLogin("kakao", data.id, data.properties.nickname);
                navigate("/");
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      })
      .catch(err => console.log(err));
  }, []);

  return <></>;
};

export default KakaoRedirection;
