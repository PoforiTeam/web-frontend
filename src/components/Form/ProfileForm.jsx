import React, { useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";

const ProfileForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const { id } = useParams();
  const formik = useFormik({
    initialValues: {
      resume_id: Number(id),
      profile_title: "",
      job_title: "",
      email: "",
      phone: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      createProfile(values);
    },
  });

  const createProfile = async values => {
    try {
      const res = await resumeApi.profile(values);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async img => {
    try {
      const form = new FormData();
      form.append("images", img);
      const { data } = await resumeApi.uploadImage(form);
      console.log(data.response.image_urls[0]);
      formik.setFieldValue("profile_image", data.response.image_urls[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      uploadImage(file);
    }
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
            <label htmlFor="profile_title">타이틀 *</label>
            <input
              id="profile_title"
              name="profile_title"
              type="text"
              maxLength="30"
              onChange={formik.handleChange}
              value={formik.values.profile_title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="job_title">직무/직업 *</label>
            <input
              id="job_title"
              name="job_title"
              type="text"
              maxLength="30"
              onChange={formik.handleChange}
              value={formik.values.job_title}
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
              <label htmlFor="phone">휴대폰 번호</label>
              <input
                id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </div>
          </div>
        </div>

        <div className="form-group image-upload">
          {" "}
          {imagePreview ? (
            <div className="image-upload-box">
              {" "}
              <img src={imagePreview} alt="Preview" className="image-preview" />
            </div>
          ) : (
            <>
              <label htmlFor="profile_image"></label>
              <input
                id="profile_image"
                name="profile_image"
                type="file"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <div
                className="image-upload-box"
                onClick={() => document.getElementById("profile_image").click()}
              >
                이미지 업로드
              </div>
            </>
          )}
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
