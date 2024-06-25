import React from "react";
import { useFormik } from "formik";

const ExperienceForm = () => {
  const formik = useFormik({
    initialValues: {
      experience_category: "",
      experience_name: "",
      experience_agency: "",
      experience_is_period: "",
      experience_start_date: "",
      experience_end_date: "",
      experience_detail: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className="resume-form" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="experience_category">구분 *</label>
        <select
          id="experience_category"
          name="experience_category"
          onChange={formik.handleChange}
          value={formik.values.experience_category}
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
          <label htmlFor="experience_name">활동명 *</label>
          <input
            id="experience_name"
            name="experience_name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.experience_name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience_agency">기관/장소</label>
          <input
            id="experience_agency"
            name="experience_agency"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.experience_agency}
          />
        </div>
      </div>
      <div className="form-group-flex">
        <div className="form-group">
          <label htmlFor="experience_is_period">기간 여부 *</label>

          <select
            id="experience_is_period"
            name="experience_is_period"
            onChange={formik.handleChange}
            value={formik.values.experience_is_period}
            className="custom-select"
          >
            <option value="">선택하세요</option>
            <option value="yes">기간 있음</option>
            <option value="no">기간 없음</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="experience_start_date">시작년월</label>
          <input
            id="experience_start_date"
            name="experience_start_date"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.experience_start_date}
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience_end_date">종료년월</label>
          <input
            id="experience_end_date"
            name="experience_end_date"
            type="month"
            onChange={formik.handleChange}
            value={formik.values.experience_end_date}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="experience_detail">활동 설명</label>
        <textarea
          id="experience_detail"
          name="experience_detail"
          maxLength="500"
          onChange={formik.handleChange}
          value={formik.values.experience_detail}
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
