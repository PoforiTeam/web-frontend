import "./Home.scss";
import { useLogin } from "@/api/hooks/useAuth";
import { useState } from "react";
import { AuthProvider } from "../../context/AuthContext";

const Home = () => {
  const [socialType, setSocialType] = useState("google"); // 초기값을 'google'로 설정
  const [socialId, setSocialId] = useState("socialId");
  const loginMutation = useLogin();

  const handleSubmit = e => {
    e.preventDefault();
    loginMutation.mutate({ socialType, socialId });
  };

  if (loginMutation.isLoading) {
    return <div>Logging in...</div>; // 로그인 진행 중
  }

  if (loginMutation.isError) {
    return <div>Error: {loginMutation.error.message}</div>; // 로그인 에러 발생 시
  }
  return (
    <div className="home">
      <button onClick={handleSubmit}>로그인</button>
      <div className="section">
        <h2>나의 첫 이력서 작성은 포포리로</h2>
        <p>취업, 이직, 아르바이트 이력서 쓰러가기</p>
      </div>
      <div className="section">
        <h3>이력서 어떻게 써야할지 막막하다면?</h3>
        <a href="/guide">가이드 보기</a>
      </div>
      <div className="section">
        <h3>포포리에게 질문이나 피드백을 남겨주세요!</h3>
        <a href="/contact">문의 남기기</a>
      </div>
      <div className="section">
        <h3>이력서 메인</h3>
        <p>이력서 템플릿 고민하지 말고 빈 칸만 채워주세요 ✍️</p>
        <button>지금 작성 시작하기</button>
      </div>
    </div>
  );
};

export default Home;
