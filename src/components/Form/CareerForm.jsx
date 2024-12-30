import React, { useRef } from 'react';
import Tips from '../common/Tips';
import CustomInput from '../common/CustomInput';
import ResumeForm from '@/components/common/ResumeForm';

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
    const textareaRef = useRef(null);

    const firstFields = [
      {
        tag: 'input',
        id: 'company_name',
        name: 'company_name',
        label: '회사명',
        type: 'text',
        required: true,
        onChange: formik.handleChange,
        values: formik.values.company_name,
      },
      {
        tag: 'input',
        id: 'job_title',
        name: 'job_title',
        label: '직무',
        type: 'text',
        onChange: formik.handleChange,
        values: formik.values.job_title,
      },
    ];

    const secondFields = [
      {
        tag: 'select',
        id: 'career_status',
        name: 'career_status',
        label: '재직 여부',
        type: 'text',
        required: true,
        onChange: formik.handleChange,
        values: formik.values.career_status,
        options: ['재직중', '퇴사'],
      },
      {
        tag: 'input',
        id: 'career_start_date',
        name: 'career_start_date',
        label: '입사년월',
        type: 'month',
        onChange: formik.handleChange,
        values: formik.values.career_start_date,
      },
      {
        tag: 'input',
        id: 'career_end_date',
        name: 'career_end_date',
        label: '재직년월',
        type: 'month',
        onChange: formik.handleChange,
        values: formik.values.career_end_date,
      },
    ];

    const thirdFields = [
      {
        tag: 'textarea',
        id: 'job_detail',
        name: 'job_detail',
        label: '담당 업무',
        maxLength: '500',
        type: 'text',
        onChange: formik.handleChange,
        values: formik.values.job_detail,
        textareaRef: textareaRef,
      },
    ];

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