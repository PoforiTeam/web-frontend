import React from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";

const CareerForm = () => {
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      resume_id: Number(id),
      company_name: "",
      job_title: "",
      career_status: "",
      career_start_date: "",
      career_end_date: "",
      job_detail: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      createCareer({
        ...values,
        career_start_date: String(values.career_start_date),
        career_end_date: String(values.career_end_date),
      });
    },
  });

  const createCareer = async values => {
    try {
      const res = await resumeApi.career(values);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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
          <label htmlFor="company_name">회사명 *</label>
          <input
            id="company_name"
            name="company_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.company_name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="job_title">직무</label>
          <input
            id="job_title"
            name="job_title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.job_title}
          />
        </div>
      </div>
      <div className="form-group-flex">
        <div className="form-group">
          <label htmlFor="career_status">재직 여부 *</label>

          <select
            id="career_status"
            name="career_status"
            onChange={formik.handleChange}
            value={formik.values.career_status}
            className="custom-select"
          >
            <option value="">선택하세요</option>
            <option value="재직중">재직중</option>
            <option value="퇴사">퇴사</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="career_start_date">입사년월</label>
          <input
            id="career_start_date"
            name="career_start_date"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.career_start_date}
          />
        </div>
        <div className="form-group">
          <label htmlFor="career_end_date">재직년월</label>
          <input
            id="career_end_date"
            name="career_end_date"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.career_end_date}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="job_detail">담당 업무</label>
        <textarea
          id="job_detail"
          name="job_detail"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.job_detail}
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

export default CareerForm;
