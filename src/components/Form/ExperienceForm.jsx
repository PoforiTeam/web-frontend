import React from 'react';
import CustomInput from '../common/CustomInput';
import ResumeForm from '@/components/common/ResumeForm';
import useExperienceFields from '../../hooks/useExperienceFields';

const ExperienceForm = () => {
  const experienceInitialValues = {
    resume_id: '',
    experience_category: '',
    experience_name: '',
    experience_agency: '',
    experience_is_period: '',
    experience_start_date: '',
    experience_end_date: '',
    experience_detail: '',
  };

  const experienceRenderFields = (formik) => {
    const { firstFields, secondFields, thirdFields, textareaFields } =
      useExperienceFields(formik);

    const tipsData = [
      '프로젝트는 지원할 업무와 가장 관련된 순으로 작성하는 것을 추천해요.',
    ];
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
          <CustomInput fields={textareaFields} />
        </div>
      </>
    );
  };

  const experienceFormItem = (experience) => {
    return (
      <div className="project-item">
        <div>
          <h1>{experience.experience_name}</h1>
          {experience.experience_agency && (
            <span>{experience.experience_agency}</span>
          )}
          <span>
            {experience.experience_start_date?.replace('-', '. ')} ~{' '}
            {experience.experience_end_date?.replace('-', '. ')}
          </span>
        </div>
        <p>{experience.experience_detail}</p>
      </div>
    );
  };

  return (
    <ResumeForm
      title={'경험'}
      category={'experience'}
      initialValues={experienceInitialValues}
      renderFields={experienceRenderFields}
      FormItem={experienceFormItem}
    />
  );
};

export default ExperienceForm;
