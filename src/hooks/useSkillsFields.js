import { useRef } from 'react';

const useSkillsFields = (formik) => {
  const textareaRef = useRef(null);

  const firstFields = [
    {
      tag: 'select',
      id: 'skill_category',
      name: 'skill_category',
      label: '구분',
      type: 'text',
      required: true,
      onChange: formik.handleChange,
      values: formik.values.skill_category,
      options: [
        '서버/백엔드',
        '프론트엔드',
        '안드로이드',
        'iOS',
        '인공지능/머신러닝',
        '마케팅',
        '디자인',
        '컴퓨터활용',
        '직접 입력',
      ],
    },
  ];

  const textareaFields = [
    {
      tag: 'textarea',
      id: 'skill_detail',
      name: 'skill_detail',
      label: '스킬 설명',
      maxLength: '500',
      type: 'text',
      onChange: formik.handleChange,
      values: formik.values.skill_detail,
      textareaRef: textareaRef,
    },
  ];

  return {
    firstFields,
    textareaFields,
  };
};

export default useSkillsFields;
