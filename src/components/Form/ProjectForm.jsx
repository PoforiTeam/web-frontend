import React from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";

const ProjectForm = () => {
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      resume_id: Number(id),
      project_name: "",
      project_agency: "",
      project_status: "",
      project_start_date: "",
      project_end_date: "",
      project_detail: "",
      project_role: "",
      project_tech: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      createProject({
        ...values,
        project_start_date: String(values.project_start_date),
        project_end_date: String(values.project_end_date),
      });
    },
  });

  const createProject = async values => {
    try {
      const res = await resumeApi.createProject(values);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="resume-form" onSubmit={formik.handleSubmit}>
      <div className="form-group" style={{ width: "630px" }}>
        <label htmlFor="project_name">프로젝트명 *</label>
        <input
          id="project_name"
          name="project_name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.project_name}
        />
      </div>
      <div className="form-group" style={{ width: "630px" }}>
        <label htmlFor="project_agency">소속/기관</label>
        <input
          id="project_agency"
          name="project_agency"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.project_agency}
        />
      </div>

      <div className="form-group-flex">
        <div className="form-group">
          <label htmlFor="project_status">진행 여부 *</label>
          <select
            id="project_status"
            name="project_status"
            onChange={formik.handleChange}
            value={formik.values.project_status}
            className="custom-select"
          >
            <option value="">선택하세요</option>
            <option value="완료">완료</option>
            <option value="진행중">진행중</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="project_start_date">입학년월</label>
          <input
            id="project_start_date"
            name="project_start_date"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.project_start_date}
          />
        </div>
        <div className="form-group">
          <label htmlFor="project_end_date">졸업년월</label>
          <input
            id="project_end_date"
            name="project_end_date"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.project_end_date}
          />
        </div>
      </div>
      <div className="tip">
        <p>🙆‍♀️&emsp;아무도 도와주는 말</p>
      </div>
      <div className="form-group">
        <label htmlFor="project_detail">프로젝트 소개</label>
        <textarea
          id="project_detail"
          name="project_detail"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.project_detail}
        />
      </div>
      <div className="form-group">
        <label htmlFor="project_project_role">나의 역할</label>
        <textarea
          id="project_role"
          name="project_role"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.project_role}
        />
      </div>
      <div className="form-group">
        <label htmlFor="project_tech">사용 기술</label>
        <textarea
          id="project_tech"
          name="project_tech"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.project_tech}
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
