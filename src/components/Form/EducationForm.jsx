import React from 'react';
import CustomInput from '../common/CustomInput';
import ResumeForm from '@/components/common/ResumeForm';
import useEducationFields from '../../hooks/useEducationFields';
import Editor from '../common/Editor';

const EducationForm = () => {
  const educationInitialValues = {
    resume_id: '',
    education_id: '',
    education_category: '',
    education_name: '',
    major: '',
    education_status: '',
    enter_date: '',
    graduate_date: '',
    detail: '',
  };

  const educationRenderFields = (formik) => {
    const { firstFields, secondFields, thirdFields, textareaField } =
      useEducationFields(formik);

    return (
      <>
        <div className="form-container">
          <CustomInput fields={firstFields} />
          <div className="form-group-flex">
            <CustomInput fields={secondFields} />
          </div>
          <div className="form-group-flex">
            <CustomInput fields={thirdFields} />
          </div>
          <label htmlFor="detail">상세 설명</label>
          <Editor />
          <CustomInput fields={textareaField} />
        </div>
      </>
    );
  };

  const educationFormItem = (education) => {
    return (
      <div className="education-item">
        <div>
          <h3>{education.education_name}</h3>
          {education.major && <span>{education.major}</span>}
          <span>
            {education.enter_date.replace('-', '. ')} ~{' '}
            {education.graduate_date.replace('-', '. ')}
          </span>
        </div>
        <p>{education.detail}</p>
      </div>
    );
  };

  return (
    <ResumeForm
      title={'교육'}
      category={'education'}
      initialValues={educationInitialValues}
      renderFields={educationRenderFields}
      FormItem={educationFormItem}
    />
  );
};

export default EducationForm;
