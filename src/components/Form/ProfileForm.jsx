import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";
import ResumeBox from "../Resume/ResumeBox";

const ProfileForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const [res, setRes] = useState({});
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    resume_id: Number(id),
    profile_title: "",
    job_title: "",
    email: "",
    phone: "",
    profile_image: "",
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: values => {
      if (Object.keys(res).length > 0) {
        updateProfile(values);
      } else {
        createProfile(values);
      }
    },
  });
  const getProfileDetail = async () => {
    try {
      const { data } = await resumeApi.profile.detail(id);
      console.log(data.response);
      if (Object.keys(data.response).length > 0) {
        setRes(data.response);
        const newInitialValues = {
          resume_id: data.response.resume_id,
          profile_id: data.response.profile_id,
          profile_title: data.response.profile_title,
          job_title: data.response.job_title,
          email: data.response.email,
          phone: data.response.phone,
          profile_image: data.response.profile_image,
        };
        setInitialValues(newInitialValues);
        formik.setValues(newInitialValues);
        const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/api/public/${
          data.response.profile_image
        }`;
        setImagePreview(imageUrl);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createProfile = async values => {
    try {
      const res = await resumeApi.profile.create(values);
      console.log(res);
      setEdit(false);
      getProfileDetail();
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfile = async values => {
    try {
      const res = await resumeApi.profile.update(values);
      console.log(res);
      setEdit(false);
      getProfileDetail();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteProfile = async profile_id => {
    try {
      const res = await resumeApi.profile.delete(profile_id);
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
  const handleCancel = () => {
    formik.resetForm({ values: initialValues });

    !(Object.keys(res).length > 0) && setImagePreview(null);
    setEdit(false);
  };
  useEffect(() => {
    getProfileDetail();
  }, []);

  return (
    <>
      <ResumeBox handleEdit={() => setEdit(true)}>
        <div className="profile-item">
          <div>
            <h1 style={{ color: formik.values.profile_title && "#000" }}>
              {formik.values.profile_title
                ? formik.values.profile_title
                : "이력서 타이틀"}
            </h1>
            <p style={{ color: formik.values.job_title && "#000" }}>
              {formik.values.job_title
                ? formik.values.job_title
                : "직무명을 입력하세요"}
            </p>
            <p style={{ color: formik.values.email && "#6D6D6D" }}>
              <i className="xi-mail" />
              {formik.values.email
                ? formik.values.email
                : "이메일을 입력하세요"}
            </p>
            <p style={{ color: formik.values.phone && "#6D6D6D" }}>
              <i className="xi-call" />{" "}
              {formik.values.phone
                ? formik.values.phone
                : "핸드폰 번호를 입력하세요"}
            </p>
          </div>
          {imagePreview ? (
            <div className="profile-preview">
              {" "}
              <img src={imagePreview} alt="Preview" className="image-preview" />
            </div>
          ) : (
            <div className="profile-picture">사진을 등록해주세요</div>
          )}
        </div>
      </ResumeBox>
      {isEdit && (
        <form
          className="resume-form"
          onSubmit={formik.handleSubmit}
          style={{ marginBottom: "40px" }}
        >
          <h2>프로필</h2>
          <div className="tip">
            <span>🙆‍♀️</span>
            <p>
              나에 대해 잘 설명해주는 한 문장의 타이틀은 강한 인상을 줄 수
              있어요.
              <br />
              <ul>
                <li>입에 잘 달라붙는 문장일수록 좋아요!</li>
              </ul>
            </p>
          </div>

          <div className="form-group-flex">
            <div style={{ minWidth: "630px" }}>
              <div className="form-group">
                <label htmlFor="profile_title">
                  타이틀 <em>*</em>
                </label>
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
                <label htmlFor="job_title">
                  직무/직업 <em>*</em>
                </label>
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
              <label htmlFor="profile_image"></label>
              <input
                id="profile_image"
                name="profile_image"
                type="file"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              {imagePreview ? (
                <div
                  className="image-upload-box"
                  onClick={() =>
                    document.getElementById("profile_image").click()
                  }
                >
                  {" "}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                </div>
              ) : (
                <>
                  <div
                    className="image-upload-box"
                    onClick={() =>
                      document.getElementById("profile_image").click()
                    }
                  >
                    이미지 업로드
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="button-group">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
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

export default ProfileForm;
