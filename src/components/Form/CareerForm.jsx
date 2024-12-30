import React, { useRef } from 'react';
import Tips from '../common/Tips';
import CustomInput from '../common/CustomInput';
import ResumeForm from '@/components/common/ResumeForm';
import useCareerFields from '../../hooks/useCareerFields';

const CareerForm = () => {
  const careerInitialValues = {
    resume_id: '',
    career_id: '',
    company_name: '',
    job_title: '',
    career_status: '',
    career_start_date: '',
    career_end_date: '',
    job_detail: '',
  };

  const careerRenderFields = (formik) => {
    const { firstFields, secondFields, thirdFields } = useCareerFields(formik);

    const tipsData = [
      '진행한 업무를 다 적기 보다는 경력사항 별로 중요한 내용만 엄선해서 작성하는 것이 중요합니다',
      '담당한 업무 내용을 요약해서 작성해보세요',
      '경력별 프로젝트 내용을 적을 경우, 역할/탐구성/기여도/성과를 기준으로 요약해서 작성해보세요',
    ];
    return (
      <>
        <Tips title="담당업무 작성법" list={tipsData} />
        <div className="form-container">
          <div className="form-group-flex">
            <CustomInput fields={firstFields} />
          </div>
          <div className="form-group-flex">
            <CustomInput fields={secondFields} />
          </div>
          <CustomInput fields={thirdFields} />
        </div>
      </>
    );
  };

  const careerFormItem = (career) => {
    return (
      <div className="education-item">
        <div>
          <h3>{career.company_name}</h3>
          <span>{career.job_title}</span>
          <span>
            {career.career_start_date.replace('-', '. ')} ~{' '}
            {career.career_end_date.replace('-', '. ')}
          </span>
        </div>
        <p>{career.job_detail}</p>
      </div>
    );
  };

  return (
    <ResumeForm
      title={'경력'}
      category={'career'}
      initialValues={careerInitialValues}
      renderFields={careerRenderFields}
      FormItem={careerFormItem}
    />
  );
};

export default CareerForm;
