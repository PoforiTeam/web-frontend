import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";

const Home = () => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();

  const createResume = async () => {
    try {
      const { data } = await resumeApi.create();
      console.log(data.response.resume_id);
      navigate(`/resume/${data.response.resume_id}`);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("auth", auth);
  }, [auth]);
  return (
    <div className="home">
      <div className="section banner">
        <div>
          <h2>나의 첫 이력서 작성은 포포리로</h2>
          <p>취업, 이직, 아르바이트 이력서 쓰러가기</p>
        </div>
        <img src="../src/assets/img/banner.png" />
      </div>
      <div className="section_column">
        <div className="section">
          <img src="../src/assets/img/guide.png" />
          <div>
            <h3>이력서 어떻게 써야할지 막막하다면?</h3>
            <a href="/guide">가이드 보기</a>
          </div>
        </div>
        <div className="section">
          <img src="../src/assets/img/question.png" />
          <div>
            <h3>포포리에게 질문이나 피드백을 남겨주세요!</h3>
            <a href="/contact">문의 남기기</a>
          </div>
        </div>
      </div>

      <div className="section_main">
        <h3>이력서 메인</h3>
        <div className="section">
          <p>
            이력서 템플릿 고민하지 말고
            <br />빈 칸만 채워주세요 ✍️
          </p>
          <span>
            단계 별로 간단하게 적기만 해도
            <br />
            나만의 이력서 페이지가 완성되어요
          </span>
          <button onClick={createResume}>지금 작성 시작하기</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
