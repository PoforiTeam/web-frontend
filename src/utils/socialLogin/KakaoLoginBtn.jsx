import axios from "axios";
import { useEffect, useState } from "react";

export const REST_API_KEY = import.meta.env.VITE_KAKAO_RESTAPI_KEY;
export const REDIRECT_URI = "http://localhost:5173/oauth/kakao";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=select_account`;
const { Kakao } = window;

const KakaoLoginBtn = () => {
  return (
    <button onClick={() => (window.location.href = KAKAO_AUTH_URL)}>
      카카오 로그인
    </button>
  );
};

export const getKakaoLoginData = async kakao_token => {
  const res = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
    headers: {
      Authorization: `Bearer ${kakao_token}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });
  console.log(res.data);
  return res.data;
};

export const kakaoLogout = () => {
  axios({
    method: "POST",
    url: "https://kapi.kakao.com/v1/user/logout",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${localStorage.getItem("kakao_token")}`,
    },
  })
    .then(() => {
      // 로그아웃 성공 시 로컬 스토리지에서 사용자 정보 제거
      localStorage.removeItem("kakao_token");
      // localStorage.removeItem("kakaoAccessToken");
      // localStorage.removeItem("kakaoUserProfile");
      console.log(
        "카카오 인증 액세스 토큰이 존재합니다.",
        Kakao.Auth.getAccessToken()
      );
      Kakao.Auth.logout(() => {
        console.log("로그아웃 되었습니다.", Kakao.Auth.getAccessToken());
        this.setState({
          isLogin: false,
        });
        localStorage.clear();
        this.props.history.push("/");
      });
      // 필요에 따라 다른 저장된 정보도 제거
      window.location.href = "/";
    })
    .catch(e => {
      console.log("e : ", e);
      // 이미 만료된 토큰일 경우
      if (e.response.data.code === -401) {
        window.location.href = "/";
      }
    });
};

export default KakaoLoginBtn;
