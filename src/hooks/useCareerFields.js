import { useRef } from 'react';

const useCareerFields = (formik) => {
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

  return {
    firstFields,
    secondFields,
    thirdFields,
  };
};

export default useCareerFields;
