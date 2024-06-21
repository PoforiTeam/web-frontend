import { useLogin } from "@/api/hooks/useAuth";
import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import GoogleLoginBtn from "../../utils/socialLogin/GoogleLoginBtn";
import Modal from "./Modal";
import KakaoLoginBtn from "../../utils/socialLogin/KakaoLoginBtn";

const LoginModal = ({ onClose }) => {
  const loginMutation = useLogin();

  const handleLogin = (socialType, socialId, name) => {
    loginMutation.mutate(
      { socialType, socialId, name },
      {
        onSuccess: onClose, // 로그인 성공 시 모달 닫기
      }
    );
  };

  if (loginMutation.isLoading) {
    return <div>Logging in...</div>; // 로그인 진행 중
  }

  if (loginMutation.isError) {
    return <div>Error: {loginMutation.error.message}</div>; // 로그인 에러 발생 시
  }
  return (
    <Modal onClose={onClose}>
      <h2>POFORI</h2>
      <GoogleLoginBtn handleLogin={handleLogin} />
      <button>네이버로 로그인</button>
      <KakaoLoginBtn />
    </Modal>
  );
};

export default LoginModal;
