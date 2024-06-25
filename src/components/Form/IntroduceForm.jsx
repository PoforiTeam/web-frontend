import React from "react";
import { useFormik } from "formik";

const IntroduceForm = () => {
  const formik = useFormik({
    initialValues: {
      introduce_text: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className="resume-form" onSubmit={formik.handleSubmit}>
      <h2>자기소개</h2>
      <div className="tip">
        <p>
          🙆‍♀️&emsp;1) 어떤 경력/경험을 가졌고 2) 관심사(일과 무관한 취미X, 일적인
          관심사)가 무엇인지 위주의 짧은 글
        </p>
      </div>
      <div className="form-group">
        <label htmlFor="introduce_text">자기소개 내용</label>
        <textarea
          id="introduce_text"
          name="introduce_text"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.introduce_text}
        />
      </div>
      <div className="button-group">
        <button type="button" className="cancel-button">
          취소
        </button>
        <button type="submit" className="submit-button">
          저장
        </button>
      </div>
    </form>
  );
};

export default IntroduceForm;
