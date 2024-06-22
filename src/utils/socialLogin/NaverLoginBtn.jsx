import { useState, useEffect } from "react";

const NaverLoginBtn = () => {
  const [user, setUser] = useState(null);
  const [naverLogin, setNaverLogin] = useState(null);

  useEffect(() => {
    const { naver } = window;

    if (!naver) {
      console.error("Naver SDK is not loaded");
      return;
    }

    const naverLoginInstance = new naver.LoginWithNaverId({
      clientId: import.meta.env.VITE_NAVER_CLIENT_ID,
      callbackUrl: "http://localhost:5173",
      isPopup: true,
    });

    setNaverLogin(naverLoginInstance);

    naverLoginInstance.init();
    console.log("Naver login initialized");

    const getUser = async () => {
      await naverLoginInstance.getLoginStatus(status => {
        console.log(`로그인?: ${status}`);
        if (status) {
          console.log(naverLoginInstance);
          setUser({ ...naverLoginInstance.user });
          window.opener.location.href = "http://localhost:5173";
          window.close();
        }
      });
    };

    getUser();
  }, []);

  const handleLoginClick = () => {
    if (naverLogin) {
      naverLogin.login();
    }
  };

  const naverLogout = () => {
    setUser(null);
    localStorage.removeItem("com.naver.nid.access_token");
    window.location.reload();
  };

  return (
    <button id="naverIdLogin" className="login_naver">
      <img src="../src/assets/img/logo/naver.png" />
      네이버로 로그인
    </button>
    //  <div>
    //   <h1>네이버 로그인</h1>
    //   {user ? (
    //     <div>
    //       <h2>네이버 로그인 성공!</h2>
    //       <h3>사용자 이름</h3>
    //       <div>{user.name}</div>
    //       <h3>Unique ID</h3>
    //       <div>{user.id}</div>
    //       <button onClick={naverLogout}>로그아웃</button>
    //     </div>
    //   ) : (
    //     <div>
    //       <div id="naverIdLogin"></div>
    //     </div>
    //   )}
    // </div>
  );
};

export default NaverLoginBtn;
