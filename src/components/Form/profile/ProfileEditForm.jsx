import React, { useRef } from 'react';

const ProfileEditForm = ({
  formik,
  imagePreview,
  handleCancel,
  handleImageUpload,
}) => {
  return (
    <form
      className="resume-form"
      onSubmit={formik.handleSubmit}
      style={{ marginBottom: '40px' }}
    >
      <h2>프로필</h2>
      <ProfileTips />
      <div className="form-group-flex">
        <ProfileInputFields formik={formik} />
        <ImageUpload
          handleImageUpload={handleImageUpload}
          imagePreview={imagePreview}
        />
      </div>

      <div className="button-group">
        <button type="button" className="cancel-button" onClick={handleCancel}>
          취소
        </button>
        <button type="submit" className="submit-button">
          저장
        </button>
      </div>
    </form>
  );
};

const ProfileTips = () => {
  return (
    <div className="tip">
      <span>🙆‍♀️</span>
      <p>
        나에 대해 잘 설명해주는 한 문장의 타이틀은 강한 인상을 줄 수 있어요.
        <br />
        <ul>
          <li>입에 잘 달라붙는 문장일수록 좋아요!</li>
        </ul>
      </p>
    </div>
  );
};

const ProfileInputFields = ({ formik }) => {
  return (
    <div style={{ minWidth: '630px' }}>
      <div className="form-group">
        <label htmlFor="profile_title">
          타이틀 <em>*</em>
        </label>
        <input
          id="profile_title"
          name="profile_title"
          type="text"
          maxLength={30}
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
          maxLength={30}
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
  );
};

const ImageUpload = ({ handleImageUpload, imagePreview }) => {
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="form-group image-upload">
      {' '}
      <label htmlFor="profile_image"></label>
      <input
        ref={fileInputRef}
        id="profile_image"
        name="profile_image"
        type="file"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      {imagePreview ? (
        <div className="image-upload-box" onClick={triggerFileInput}>
          {' '}
          <img src={imagePreview} alt="Preview" className="image-preview" />
        </div>
      ) : (
        <div className="image-upload-box" onClick={triggerFileInput}>
          이미지 업로드
        </div>
      )}
    </div>
  );
};

export default ProfileEditForm;
