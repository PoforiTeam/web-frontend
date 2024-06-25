import React from "react";
import { useFormik } from "formik";

const ProjectForm = () => {
  const formik = useFormik({
    initialValues: {
      projectName: "",
      organization: "",
      status: "",
      startDate: "",
      endDate: "",
      projectDescription: "",
      role: "",
      technologies: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className="resume-form" onSubmit={formik.handleSubmit}>
      <div className="form-group" style={{ width: "630px" }}>
        <label htmlFor="projectName">프로젝트명 *</label>
        <input
          id="projectName"
          name="projectName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.projectName}
        />
      </div>
      <div className="form-group" style={{ width: "630px" }}>
        <label htmlFor="organization">소속/기관</label>
        <input
          id="organization"
          name="organization"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.organization}
        />
      </div>

      <div className="form-group-flex">
        <div className="form-group">
          <label htmlFor="status">진행 여부 *</label>
          <select
            id="status"
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
            className="custom-select"
          >
            <option value="">선택하세요</option>
            <option value="completed">완료</option>
            <option value="ongoing">진행중</option>
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
      <div className="tip">
        <p>🙆‍♀️&emsp;아무도 도와주는 말</p>
      </div>
      <div className="form-group">
        <label htmlFor="projectDescription">프로젝트 소개</label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.projectDescription}
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">나의 역할</label>
        <textarea
          id="role"
          name="role"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.role}
        />
      </div>
      <div className="form-group">
        <label htmlFor="technologies">사용 기술</label>
        <textarea
          id="technologies"
          name="technologies"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.technologies}
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

export default ProjectForm;
