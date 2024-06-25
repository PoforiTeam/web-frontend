import React from "react";
import { useFormik } from "formik";

const SkillsForm = () => {
  const formik = useFormik({
    initialValues: {
      category: "",
      description: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className="resume-form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">구분 *</label>
        <select
          id="category"
          name="category"
          onChange={formik.handleChange}
          value={formik.values.category}
          className="custom-select"
        >
          <option value="">선택하세요</option>
          <option value="backend">서버/백엔드</option>
          <option value="frontend">프론트엔드</option>
          <option value="android">안드로이드</option>
          <option value="ios">iOS</option>
          <option value="ai">인공지능/머신러닝</option>
          <option value="marketing">마케팅</option>
          <option value="design">디자인</option>
          <option value="it">컴퓨터활용</option>
          <option value="other">직접 입력</option>
        </select>
      </div>
      <div className="tip">
        <p>🙆‍♀️&emsp;구분 별로 스킬 예시, 스킬 설명쓰는 법에 대한 안내.</p>
      </div>
      <div className="form-group">
        <label htmlFor="description">스킬 설명</label>
        <textarea
          id="description"
          name="description"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.description}
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

export default SkillsForm;
