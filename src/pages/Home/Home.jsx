import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import "./Home.scss";

const Home = () => {
  const { auth } = useAuthContext();
  useEffect(() => {
    console.log("auth", auth);
  }, [auth]);
  return (
    <div className="home">
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
