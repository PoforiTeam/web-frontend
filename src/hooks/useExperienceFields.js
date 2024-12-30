import { useRef } from 'react';

const useExperienceFields = (formik) => {
  const textareaRef = useRef(null);

  const firstFields = [
    {
      tag: 'select',
      id: 'experience_category',
      name: 'experience_category',
      label: '구분',
      type: 'text',
      required: true,
      onChange: formik.handleChange,
      values: formik.values.experience_category,
      options: ['인턴', '자원봉사', '동아리', '아르바이트', '수상', '프로젝트'],
    },
  ];

  const secondFields = [
    {
      tag: 'input',
      id: 'experience_name',
      name: 'experience_name',
      label: '활동명',
      type: 'text',
      required: true,
      onChange: formik.handleChange,
      values: formik.values.experience_name,
    },
    {
      tag: 'input',
      id: 'experience_agency',
      name: 'experience_agency',
      label: '기관/장소',
      type: 'text',
      required: false,
      onChange: formik.handleChange,
      values: formik.values.experience_agency,
    },
  ];

  const thirdFields = [
    {
      tag: 'select',
      id: 'experience_is_period',
      name: 'experience_is_period',
      label: '기간 여부',
      type: 'text',
      required: true,
      onChange: formik.handleChange,
      values: formik.values.experience_is_period,
      options: ['기간 있음', '기간 없음'],
    },
    {
      tag: 'input',
      id: 'experience_start_date',
      name: 'experience_start_date',
      label: '시작년월',
      type: 'month',
      onChange: formik.handleChange,
      values: formik.values.experience_start_date,
    },
    {
      tag: 'input',
      id: 'experience_end_date',
      name: 'experience_end_date',
      label: '종료년월',
      type: 'month',
      onChange: formik.handleChange,
      values: formik.values.experience_end_date,
    },
  ];

  const textareaFields = [
    {
      tag: 'textarea',
      id: 'experience_detail',
      name: 'experience_detail',
      label: '활동 설명',
      maxLength: '500',
      type: 'text',
      onChange: formik.handleChange,
      values: formik.values.experience_detail,
      textareaRef: textareaRef,
    },
  ];

  return {
    firstFields,
    secondFields,
    thirdFields,
    textareaFields,
  };
};

export default useExperienceFields;
