import React from "react";
import { useFormik } from "formik";

const EducationForm = () => {
  const formik = useFormik({
    initialValues: {
      level: "",
      schoolName: "",
      major: "",
      graduationStatus: "",
      startDate: "",
      endDate: "",
      description: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className="resume-form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="level">구분 *</label>
        <select
          id="level"
          name="level"
          onChange={formik.handleChange}
          value={formik.values.level}
          className="custom-select"
        >
          <option value="">선택하세요</option>
          <option value="highschool">고등학교</option>
          <option value="bachelor">대학교</option>
          <option value="master">석사</option>
          <option value="doctor">박사</option>
        </select>
      </div>
      <div className="form-group-flex">
        <div className="form-group">
          <label htmlFor="schoolName">학교명 *</label>
          <input
            id="schoolName"
            name="schoolName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.schoolName}
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
          <label htmlFor="graduationStatus">졸업 여부 *</label>
          <select
            id="graduationStatus"
            name="graduationStatus"
            onChange={formik.handleChange}
            value={formik.values.graduationStatus}
          >
            <option value="">선택하세요</option>
            <option value="graduated">졸업</option>
            <option value="attending">재학중</option>
            <option value="leave">휴학</option>
            <option value="dropout">중퇴</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">입학년월</label>
          <input
            id="startDate"
            name="startDate"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.startDate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">졸업년월</label>
          <input
            id="endDate"
            name="endDate"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.endDate}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="description">상세 설명</label>
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

export default EducationForm;
