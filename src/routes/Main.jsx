import GoogleLoginButton from "../utils/socialLogin/googleLogin";
import KakaoLogin from "../utils/socialLogin/kakaoLogin";
import NaverLogin from "../utils/socialLogin/naverLogin";

function Main() {
  return (
    <>
      <GoogleLoginButton />
      <KakaoLogin />
      <NaverLogin />
    </>
  );
}

export default Main;
