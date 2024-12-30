import React from 'react';
import { useFormik } from 'formik';
import { resumeApi } from '../../../api/resumeApi';
import ResumeBox from '../../Resume/ResumeBox';
import Editor from '../../common/Editor';

const EducationFormItem = ({
  id,
  index,
  list,
  setList,
  education,
  isEdit,
  handleEdit,
  handleCancel,
  getEducationDetail,
}) => {
  const initialValues = {
    resume_id: Number(id),
    education_id: Number(education.education_id) || '',
    education_category: education.education_category || '',
    education_name: education.education_name || '',
    major: education.major || '',
    education_status: education.education_status || '',
    enter_date: education.enter_date || '',
    graduate_date: education.graduate_date || '',
    detail: education.detail || '',
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (education.education_id) {
        updateEducation(values);
      } else {
        createEducation(values);
      }
    },
  });

  const createEducation = async (values) => {
    try {
      const res = await resumeApi.education.create(values);
      console.log(res);
      getEducationDetail();
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const updateEducation = async (values) => {
    try {
      const res = await resumeApi.education.update(values);
      console.log(res);
      getEducationDetail();
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEducation = async () => {
    try {
      const res = await resumeApi.education.delete(education.education_id);
      console.log(res);
      getEducationDetail();
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
        <ResumeBox
          index={index}
          handleEdit={handleEdit}
          handleDelete={deleteEducation}
        >
          <div className="education-item">
            <div>
              <h3>{education.education_name}</h3>
              {education.major && <span>{education.major}</span>}
              <span>
                {education.enter_date.replace('-', '. ')} ~{' '}
                {education.graduate_date.replace('-', '. ')}
              </span>
            </div>
            <p>{education.detail}</p>
          </div>
        </ResumeBox>
      )}
      {isEdit && (
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
            <Editor />
            <textarea
              id="detail"
              name="detail"
              maxLength="500"
              onChange={formik.handleChange}
              value={formik.values.detail}
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

export default EducationFormItem;
