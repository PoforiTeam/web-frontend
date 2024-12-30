import { useRef } from 'react';

const useEducationFields = (formik) => {
  const textareaRef = useRef(null);

  const firstFields = [
    {
      tag: 'select',
      id: 'education_category',
      name: 'education_category',
      label: '구분',
      type: 'text',
      required: true,
      onChange: formik.handleChange,
      values: formik.values.education_category,
      options: ['고등학교', '대학교', '석사', '박사'],
    },
  ];

  const secondFields = [
    {
      tag: 'input',
      id: 'education_name',
      name: 'education_name',
      label: '학교명',
      type: 'text',
      required: true,
      onChange: formik.handleChange,
      values: formik.values.education_name,
    },
    {
      tag: 'input',
      id: 'major',
      name: 'major',
      label: '전공',
      type: 'text',
      required: false,
      onChange: formik.handleChange,
      values: formik.values.major,
    },
  ];

  const thirdFields = [
    {
      tag: 'select',
      id: 'education_status',
      name: 'education_status',
      label: '졸업 여부',
      type: 'text',
      required: true,
      onChange: formik.handleChange,
      values: formik.values.education_status,
      options: ['졸업', '재학중', '휴학', '중퇴'],
    },
    {
      tag: 'input',
      id: 'enter_date',
      name: 'enter_date',
      label: '입학년월',
      type: 'month',
      required: false,
      onChange: formik.handleChange,
      values: formik.values.enter_date,
    },
    {
      tag: 'input',
      id: 'graduate_date',
      name: 'graduate_date',
      label: '졸업년월',
      type: 'month',
      required: false,
      onChange: formik.handleChange,
      values: formik.values.graduate_date,
    },
  ];

  const textareaField = [
    {
      tag: 'textarea',
      id: 'detail',
      name: 'detail',
      label: '상세 설명',
      maxLength: '500',
      type: 'text',
      onChange: formik.handleChange,
      values: formik.values.detail,
      textareaRef: textareaRef,
    },
  ];

  return {
    firstFields,
    secondFields,
    thirdFields,
    textareaField,
  };
};

export default useEducationFields;
