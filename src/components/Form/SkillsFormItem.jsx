import React from "react";
import { useFormik } from "formik";
import { resumeApi } from "../../api/resumeApi";
import ResumeBox from "../Resume/ResumeBox";

const SkillsFormItem = ({
  id,
  res,
  isEdit,
  handleEdit,
  handleCancel,
  getDetail,
}) => {
  const initialValues = {
    resume_id: Number(id),
    skill_id: Number(res.skill_id) || "",
    skill_category: res.skill_category || "",
    skill_detail: res.skill_detail || "",
  };
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: values => {
      if (res.skill_id) {
        updateDetail(values);
      } else {
        createDetail(values);
      }
    },
  });

  const createDetail = async values => {
    try {
      const { data } = await resumeApi.skill.create(values);
      console.log(data);
      getDetail();
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const updateDetail = async values => {
    try {
      const { data } = await resumeApi.skill.update(values);
      console.log(data);
      getDetail();
      handleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteDetail = async () => {
    try {
      const { data } = await resumeApi.skill.delete(res.skill_id);
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
              <h3>{res.skill_category}</h3>
            </div>
            <p>{res.skill_detail}</p>
          </div>
        </ResumeBox>
      )}
      {isEdit && (
        <form className="resume-form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="skill_category">구분 *</label>
            <select
              id="skill_category"
              name="skill_category"
              onChange={formik.handleChange}
              value={formik.values.skill_category}
              className="custom-select"
            >
              <option value="">선택하세요</option>
              <option value="backend">서버/백엔드</option>
              <option value="frontend">프론트엔드</option>
              <option value="android">안드로이드</option>
              <option value="ios">iOS</option>
              <option value="ai">인공지능/머신러닝</option>
              <option value="marketing">마케팅</option>
              <option value="design">디자인</option>
              <option value="it">컴퓨터활용</option>
              <option value="other">직접 입력</option>
            </select>
          </div>
          <div className="tip">
            <p>🙆‍♀️&emsp;구분 별로 스킬 예시, 스킬 설명쓰는 법에 대한 안내.</p>
          </div>
          <div className="form-group">
            <label htmlFor="skill_detail">스킬 설명</label>
            <textarea
              id="skill_detail"
              name="skill_detail"
              maxLength="500"
              onChange={formik.handleChange}
              value={formik.values.skill_detail}
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

export default SkillsFormItem;
