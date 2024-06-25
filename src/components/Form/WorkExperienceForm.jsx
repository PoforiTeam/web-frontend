import React from "react";
import { useFormik } from "formik";

const WorkExperienceForm = () => {
  const formik = useFormik({
    initialValues: {
      companyName: "",
      jobTitle: "",
      employmentStatus: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className="resume-form" onSubmit={formik.handleSubmit}>
      <div className="tip">
        <span>🙆‍♀️</span>
        <ul>
          <p>담당업무 작성법</p>
          <li>
            진행한 업무를 다 적기 보다는 경력사항 별로 중요한 내용만 엄선해서
            작성하는 것이 중요합니다
          </li>
          <li>담당한 업무 내용을 요약해서 작성해보세요</li>
          <li>
            경력별 프로젝트 내용을 적을 경우, 역할/탐구성/기여도/성과를 기준으로
            요약해서 작성해보세요
          </li>
        </ul>
      </div>
      <div className="form-group-flex">
        <div className="form-group">
          <label htmlFor="companyName">회사명 *</label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.companyName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobTitle">직무</label>
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.jobTitle}
          />
        </div>
      </div>
      <div className="form-group-flex">
        <div className="form-group">
          <label htmlFor="employmentStatus">재직 여부 *</label>

          <select
            id="employmentStatus"
            name="employmentStatus"
            onChange={formik.handleChange}
            value={formik.values.employmentStatus}
            className="custom-select"
          >
            <option value="">선택하세요</option>
            <option value="employed">재직중</option>
            <option value="unemployed">퇴사</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">입사년월</label>
          <input
            id="startDate"
            name="startDate"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.startDate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">재직년월</label>
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
        <label htmlFor="responsibilities">담당 업무</label>
        <textarea
          id="responsibilities"
          name="responsibilities"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.responsibilities}
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

export default WorkExperienceForm;
