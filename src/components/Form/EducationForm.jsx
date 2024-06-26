import React from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";

const EducationForm = () => {
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      resume_id: Number(id),
      education_category: "",
      education_name: "",
      major: "",
      education_status: "",
      enter_date: "",
      graduate_date: "",
      detail: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      createEducation(values);
    },
  });

  const createEducation = async values => {
    try {
      const res = await resumeApi.createEducation(values);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="resume-form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="education_category">구분 *</label>
        <select
          id="education_category"
          name="education_category"
          onChange={formik.handleChange}
          value={formik.values.education_category}
          className="custom-select"
        >
          <option value="">선택하세요</option>
          <option value="고등학교">고등학교</option>
          <option value="대학교">대학교</option>
          <option value="석사">석사</option>
          <option value="박사">박사</option>
        </select>
      </div>
      <div className="form-group-flex">
        <div className="form-group">
          <label htmlFor="education_name">학교명 *</label>
          <input
            id="education_name"
            name="education_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.education_name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="major">전공</label>
          <input
            id="major"
            name="major"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.major}
          />
        </div>
      </div>
      <div className="form-group-flex">
        <div className="form-group">
          <label htmlFor="education_status">졸업 여부 *</label>
          <select
            id="education_status"
            name="education_status"
            onChange={formik.handleChange}
            value={formik.values.education_status}
          >
            <option value="">선택하세요</option>
            <option value="졸업">졸업</option>
            <option value="재학중">재학중</option>
            <option value="휴학">휴학</option>
            <option value="중퇴">중퇴</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="enter_date">입학년월</label>
          <input
            id="enter_date"
            name="enter_date"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.enter_date}
          />
        </div>
        <div className="form-group">
          <label htmlFor="graduate_date">졸업년월</label>
          <input
            id="graduate_date"
            name="graduate_date"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.graduate_date}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="detail">상세 설명</label>
        <textarea
          id="detail"
          name="detail"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.detail}
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

export default EducationForm;
