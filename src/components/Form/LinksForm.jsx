import React from "react";
import { useFormik } from "formik";

const LinksForm = () => {
  const formik = useFormik({
    initialValues: {
      link_category: "",
      link_detail: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className="resume-form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="link_category">구분 *</label>
        <select
          id="link_category"
          name="link_category"
          onChange={formik.handleChange}
          value={formik.values.link_category}
          className="custom-select"
        >
          <option value="">선택하세요</option>
          <option value="portfolio">포트폴리오</option>
          <option value="blog">블로그</option>
          <option value="facebook">페이스북</option>
          <option value="notion">노션</option>
          <option value="linkedin">링크드인</option>
          <option value="github">Github</option>
          <option value="other">직접 입력</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="link_detail">링크</label>
        <input
          id="link_detail"
          name="link_detail"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.link_detail}
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

export default LinksForm;
