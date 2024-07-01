import React from "react";
import { useFormik } from "formik";
import { resumeApi } from "../../api/resumeApi";
import ResumeBox from "../Resume/ResumeBox";

const ProjectFormItem = ({
  id,
  res,
  isEdit,
  handleEdit,
  handleCancel,
  getDetail,
}) => {
  const initialValues = {
    resume_id: Number(id),
    project_id: Number(res.project_id) || "",
    project_name: res.project_name || "",
    project_agency: res.project_agency || "",
    project_status: res.project_status || "",
    project_start_date: res.project_start_date || "",
    project_end_date: res.project_end_date || "",
    project_detail: res.project_detail || "",
    project_role: res.project_role || "",
    project_tech: res.project_tech || "",
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));

      const newInitialValues = {
        ...values,
        project_start_date: String(values.project_start_date),
        project_end_date: String(values.project_end_date),
      };
      formik.setValues(newInitialValues);
      if (res.project_id) {
        updateDetail(values);
      } else {
        createDetail(values);
      }
    },
  });

  const createDetail = async values => {
    try {
      const { data } = await resumeApi.project.create(values);
      console.log(data);
      getDetail();
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const updateDetail = async values => {
    try {
      const { data } = await resumeApi.project.update(values);
      console.log(data);
      getDetail();
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDetail = async () => {
    try {
      const { data } = await resumeApi.project.delete(res.project_id);
      console.log(data);
      getDetail();
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelClick = () => {
    formik.resetForm({ values: initialValues });
    handleCancel();
  };

  return (
    <>
      {!isEdit && (
        <ResumeBox handleEdit={handleEdit} handleDelete={deleteDetail}>
          <div className="project-item">
            <div>
              <h1>{res.project_name}</h1>
              <span>
                {res.project_start_date.replace("-", ". ")} ~{" "}
                {res.project_end_date.replace("-", ". ")}
              </span>
            </div>
            <p>{res.project_detail}</p>
            <div>
              <h3>나의 역할</h3>
              <p>{res.project_role}</p>
            </div>
            <div>
              <h3>사용 기술</h3>
              <p>{res.project_tech}</p>
            </div>
          </div>
        </ResumeBox>
      )}
      {isEdit && (
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
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancelClick}
            >
              취소
            </button>
            <button type="submit" className="submit-button">
              저장
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ProjectFormItem;
