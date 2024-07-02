import React from "react";
import { useFormik } from "formik";
import { resumeApi } from "../../api/resumeApi";
import ResumeBox from "../Resume/ResumeBox";

const LinksFormItem = ({
  id,
  res,
  isEdit,
  handleEdit,
  handleCancel,
  getDetail,
}) => {
  const initialValues = {
    resume_id: Number(id),
    link_id: Number(res.link_id) || "",
    link_category: res.link_category || "",
    link_detail: res.link_detail || "",
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: values => {
      if (res.link_id) {
        updateDetail(values);
      } else {
        createDetail(values);
      }
    },
  });

  const createDetail = async values => {
    try {
      const { data } = await resumeApi.link.create(values);
      console.log(data);
      getDetail();
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const updateDetail = async values => {
    try {
      const { data } = await resumeApi.link.update(values);
      console.log(data);
      getDetail();
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDetail = async () => {
    try {
      const { data } = await resumeApi.link.delete(res.link_id);
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
          <div className="education-item">
            <div>
              <h3>{res.link_category}</h3>
            </div>
            <a href={res.link_detail} target="_blank" rel="noopener noreferrer">
              {res.link_detail}
            </a>
          </div>
        </ResumeBox>
      )}
      {isEdit && (
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

export default LinksFormItem;
