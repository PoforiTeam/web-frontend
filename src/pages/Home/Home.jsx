import { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import { resumeApi } from '../../api/resumeApi';
import AddButton from '../../components/Resume/AddButton';

const Home = () => {
  const { auth } = useAuthContext();
  const navigate = useNavigate();
  const [resumeList, setResumeList] = useState(null);
  const [isSubDropdown, setSubDropdown] = useState('');
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSubDropdown('');
    }
  };

  const createResume = async () => {
    try {
      const { data } = await resumeApi.create();
      console.log(data.response.resume_id);
      navigate(`/resume/${data.response.resume_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const getResumeList = async () => {
    try {
      const params = {
        get_all: true,
      };
      const { data } = await resumeApi.list(params);
      console.log(data.response.result);
      setResumeList(data.response.result);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteResume = async (id) => {
    try {
      const { data } = await resumeApi.delete(id);
      console.log(data);
      getResumeList();
    } catch (err) {
      console.log(err);
    }
  };

  const copyResume = async (id) => {
    try {
      const { data } = await resumeApi.copy(id);
      console.log(data);
      getResumeList();
    } catch (err) {
      console.log(err);
    }
  };

  function formatDate(dateString) {
    return dateString.split('T')[0].replace(/-/g, '.');
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    console.log('auth', auth);
    if (auth) {
      getResumeList();
    }
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
        <div className="section section_card">
          <img src="../src/assets/img/guide.png" />
          <div>
            <h3>이력서 어떻게 써야할지 막막하다면?</h3>
            <a href="/guide">가이드 보기</a>
          </div>
        </div>
        <div className="section section_card">
          <img src="../src/assets/img/question.png" />
          <div>
            <h3>포포리에게 질문이나 피드백을 남겨주세요!</h3>
            <a href="/contact">문의 남기기</a>
          </div>
        </div>
      </div>

      {resumeList ? (
        <div className="section_main">
          <div className="section_header">
            <h3>이력서 메인</h3>
            <div className="add-btn" onClick={createResume}>
              새 이력서 추가
              <i className="xi-plus-min" />
            </div>
          </div>
          <div className="resume_list">
            {resumeList?.map((list) => (
              <div className="resume_card" key={list?.resume_id}>
                <div className="preview">
                  <div className="preview-box">
                    <div>
                      <div>
                        <h1>{list?.resume_title}</h1>
                        <div className="preview-list">
                          <div></div>
                          <p>{list?.email || '000@0000.000'}</p>
                        </div>
                        <div className="preview-list">
                          <div></div>
                          <p>{list?.phone || '010-0000-0000'}</p>
                        </div>
                      </div>
                      <div className="preview-default"></div>
                    </div>
                    <span>{list?.introduce_text}</span>
                  </div>
                </div>
                <div className="info">
                  <div>
                    <h3>{list?.resume_title}</h3>
                    <p>마지막 수정일 {formatDate(list?.resume_updated_at)}</p>
                  </div>
                  <i
                    className="xi-ellipsis-h"
                    onClick={() => setSubDropdown(list?.resume_id)}
                  />
                  {isSubDropdown === list?.resume_id && (
                    <div className="sub-dropdown" ref={dropdownRef}>
                      <div
                        onClick={() => navigate(`/resume/${list?.resume_id}`)}
                      >
                        수정하기 <i className="xi-pen" />
                      </div>
                      <div onClick={() => copyResume(list?.resume_id)}>
                        복제하기 <i className="xi-library-add" />
                      </div>
                      <div onClick={() => deleteResume(list?.resume_id)}>
                        삭제하기 <i className="xi-trash-o" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="resume_card resume_plus" onClick={createResume}>
              <div className="resume_plus-btn">
                <i className="xi-pen" />
              </div>
              <span>새 이력서 작성하기</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="section_main">
          <div className="section_header">
            <h3>이력서 메인</h3>
          </div>
          <div className="section section_card">
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
      )}
    </div>
  );
};

export default Home;
