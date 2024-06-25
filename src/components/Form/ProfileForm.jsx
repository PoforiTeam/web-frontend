import React from "react";
import { useFormik } from "formik";

const ProfileForm = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      jobTitle: "",
      email: "",
      phoneNumber: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleImageUpload = event => {
    formik.setFieldValue("profileImage", event.currentTarget.files[0]);
  };

  return (
    <form className="resume-form" onSubmit={formik.handleSubmit}>
      <h2>프로필</h2>
      <div className="tip">
        <span>🙆‍♀️</span>
        <p>
          나에 대해 잘 설명해주는 한 문장의 제목은 강한 인상을 줄 수 있다.
          <br />
          Tip: 입에 잘 달라붙는 문장일수록 좋다.
        </p>
      </div>

      <div className="form-group-flex">
        <div style={{ minWidth: "630px" }}>
          <div className="form-group">
            <label htmlFor="title">타이틀 *</label>
            <input
              id="title"
              name="title"
              type="text"
              maxLength="30"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle">직무/직업 *</label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              maxLength="30"
              onChange={formik.handleChange}
              value={formik.values.jobTitle}
            />
          </div>
          <div className="form-group-flex">
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">휴대폰 번호</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
            </div>
          </div>
        </div>

        <div className="form-group image-upload">
          <label htmlFor="profileImage"></label>
          <input
            id="profileImage"
            name="profileImage"
            type="file"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <div
            className="image-upload-box"
            onClick={() => document.getElementById("profileImage").click()}
          >
            이미지 업로드
          </div>
        </div>
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

export default ProfileForm;
