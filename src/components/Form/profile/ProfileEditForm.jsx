import React, { useRef } from 'react';
import Tips from '../../common/Tips';
import EditForm from '../../common/EditForm';
import CustomInput from '../../common/CustomInput';

const ProfileEditForm = ({
  formik,
  imagePreview,
  handleCancel,
  handleImageUpload,
}) => {
  return (
    <EditForm
      title={'프로필'}
      onSubmit={formik.handleSubmit}
      handleCancel={handleCancel}
    >
      <Tips
        title={
          '나에 대해 잘 설명해주는 한 문장의 타이틀은 강한 인상을 줄 수 있어요.'
        }
        list={['입에 잘 달라붙는 문장일수록 좋아요!']}
      />
      <div className="form-group-flex">
        <ProfileInputFields formik={formik} />
        <ImageUpload
          handleImageUpload={handleImageUpload}
          imagePreview={imagePreview}
        />
      </div>
    </EditForm>
  );
};

const ProfileInputFields = ({ formik }) => {
  const fields = [
    {
      tag: 'input',
      id: 'profile_title',
      name: 'profile_title',
      label: '타이틀',
      type: 'text',
      maxLength: 30,
      required: true,
      onChange: formik.handleChange,
      values: formik.values.profile_title,
    },
    {
      tag: 'input',
      id: 'job_title',
      name: 'job_title',
      label: '직무/직업',
      type: 'text',
      maxLength: 30,
      required: true,
      onChange: formik.handleChange,
      values: formik.values.job_title,
    },
  ];
  const fieldsWithFlex = [
    {
      tag: 'input',
      id: 'email',
      name: 'email',
      label: '이메일',
      type: 'email',
      required: false,
      onChange: formik.handleChange,
      values: formik.values.email,
    },
    {
      tag: 'input',
      id: 'phone',
      name: 'phone',
      label: '휴대폰 번호',
      type: 'text',
      required: false,
      onChange: formik.handleChange,
      values: formik.values.phone,
    },
  ];

  return (
    <div className="form-container">
      <CustomInput fields={fields} />
      <div className="form-group-flex">
        <CustomInput fields={fieldsWithFlex} />
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
