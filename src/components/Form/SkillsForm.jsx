import React from 'react';
import CustomInput from '../common/CustomInput';
import ResumeForm from '@/components/common/ResumeForm';
import useSkillsFields from '../../hooks/useSkillsFields';
import Tips from '../common/Tips';

const SkillsForm = () => {
  const skillsInitialValues = {
    resume_id: '',
    skill_id: '',
    skill_category: '',
    skill_detail: '',
  };

  const skillsRenderFields = (formik) => {
    const { firstFields, textareaFields } = useSkillsFields(formik);

    const tipsData = ['구분 별로 스킬 예시, 스킬 설명쓰는 법에 대한 안내.'];
    return (
      <>
        <div className="form-container">
          <CustomInput fields={firstFields} />
          <Tips list={tipsData} />
          <CustomInput fields={textareaFields} />
        </div>
      </>
    );
  };

  const skillsFormItem = (skills) => {
    return (
      <div className="education-item">
        <div>
          <h3>{skills.skill_category}</h3>
        </div>
        <p>{skills.skill_detail}</p>
      </div>
    );
  };

  return (
    <ResumeForm
      title={'스킬'}
      category={'skill'}
      initialValues={skillsInitialValues}
      renderFields={skillsRenderFields}
      FormItem={skillsFormItem}
    />
  );
};

export default SkillsForm;
