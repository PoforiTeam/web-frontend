import React from "react";
import { useFormik } from "formik";

const ExperienceForm = () => {
  const formik = useFormik({
    initialValues: {
      category: "",
      activityName: "",
      organization: "",
      periodStatus: "",
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
        <label htmlFor="category">구분 *</label>
        <select
          id="category"
          name="category"
          onChange={formik.handleChange}
          value={formik.values.category}
          className="custom-select"
        >
          <option value="">선택하세요</option>
          <option value="intern">인턴</option>
          <option value="volunteer">자원봉사</option>
          <option value="club">동아리</option>
          <option value="parttime">아르바이트</option>
          <option value="research">수상</option>
          <option value="project">프로젝트</option>
        </select>
      </div>
      <div className="form-group-flex">
        <div className="form-group">
          <label htmlFor="activityName">활동명 *</label>
          <input
            id="activityName"
            name="activityName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.activityName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="organization">기관/장소</label>
          <input
            id="organization"
            name="organization"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.organization}
          />
        </div>
      </div>
      <div className="form-group-flex">
        <div className="form-group">
          <label htmlFor="periodStatus">기간 여부 *</label>

          <select
            id="periodStatus"
            name="periodStatus"
            onChange={formik.handleChange}
            value={formik.values.periodStatus}
            className="custom-select"
          >
            <option value="">선택하세요</option>
            <option value="yes">기간 있음</option>
            <option value="no">기간 없음</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">시작년월</label>
          <input
            id="startDate"
            name="startDate"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.startDate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">종료년월</label>
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
        <label htmlFor="description">활동 설명</label>
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

export default ExperienceForm;
