import { useLogin } from "@/api/hooks/useAuth";
import "./Modal.scss";
import GoogleLoginBtn from "../../utils/socialLogin/GoogleLoginBtn";
import Modal from "./Modal";
import KakaoLoginBtn from "../../utils/socialLogin/KakaoLoginBtn";
import NaverLoginBtn from "../../utils/socialLogin/NaverLoginBtn";

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
    <Modal onClose={onClose} maxWidth="421px" maxHeight="424px">
      <div className="login-modal">
        <h2 className="logo">POFORI</h2>
        <GoogleLoginBtn handleLogin={handleLogin} />
        <NaverLoginBtn />
        <KakaoLoginBtn />
        <span>이용약관과 개인정보수집 및 이용에 동의합니다</span>
      </div>
    </Modal>
  );
};

export default LoginModal;
