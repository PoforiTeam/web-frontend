import React from 'react';

const IntroduceEditForm = ({ formik, textareaRef, handleCancel }) => {
  return (
    <form className="resume-form" onSubmit={formik.handleSubmit}>
      <h2>자기소개</h2>
      <div className="tip">
        <span>🙆‍♀️</span>
        <div>
          자기소개는 내가 어떤 경력/경험을 가졌고 관심사가 무엇인지 위주의 짧은
          글이에요.
          <ul>
            <li>
              면접관이 이력서를 더 읽고 싶도록 장점을 강조해서 작성해보세요.
            </li>
            <li>
              본인의 강점을 나타내는 키워드와 함께 이를 뒷받침할 수 있는 내용을
              적으면 더 설득력이 있습니다.
            </li>
            <li>경력인 경우에는, 업무 성과를 강조하는 것을 추천합니다.</li>
          </ul>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="introduce_text">
          자기소개 내용 <em>*</em>
        </label>
        <textarea
          id="introduce_text"
          name="introduce_text"
          onChange={formik.handleChange}
          value={formik.values.introduce_text}
          ref={textareaRef}
        />
      </div>
      <div className="button-group">
        <button type="button" className="cancel-button" onClick={handleCancel}>
          취소
        </button>
        <button type="submit" className="submit-button">
          저장
        </button>
      </div>
    </form>
  );
};

export default IntroduceEditForm;
