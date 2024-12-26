import React from 'react';

const ProfileDisplay = ({ formik, imagePreview }) => {
  return (
    <div className="profile-item">
      <div>
        <h1 style={{ color: formik.values.profile_title && '#000' }}>
          {formik.values.profile_title
            ? formik.values.profile_title
            : '이력서 타이틀'}
        </h1>
        <p style={{ color: formik.values.job_title && '#000' }}>
          {formik.values.job_title
            ? formik.values.job_title
            : '직무명을 입력하세요'}
        </p>
        <p style={{ color: formik.values.email && '#6D6D6D' }}>
          <i className="xi-mail" />
          {formik.values.email ? formik.values.email : '이메일을 입력하세요'}
        </p>
        <p style={{ color: formik.values.phone && '#6D6D6D' }}>
          <i className="xi-call" />{' '}
          {formik.values.phone
            ? formik.values.phone
            : '핸드폰 번호를 입력하세요'}
        </p>
      </div>
      {imagePreview ? (
        <div className="profile-preview">
          {' '}
          <img src={imagePreview} alt="Preview" className="image-preview" />
        </div>
      ) : (
        <div className="profile-picture">사진을 등록해주세요</div>
      )}
    </div>
  );
};

export default ProfileDisplay;
