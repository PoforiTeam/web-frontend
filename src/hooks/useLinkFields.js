import { useRef } from 'react';

const useLinkFields = (formik) => {
  const projectDetailTextareaRef = useRef(null);
  const projectRoleTextareaRef = useRef(null);
  const usedSkillsTextareaRef = useRef(null);

  const firstFields = [
    {
      tag: 'select',
      id: 'link_category',
      name: 'link_category',
      label: '구분',
      type: 'text',
      required: true,
      onChange: formik.handleChange,
      values: formik.values.link_category,
      options: [
        '포트폴리오',
        '블로그',
        '페이스북',
        '노션',
        '링크드인',
        'Github',
        '직접 입력',
      ],
    },
  ];

  const secondFields = [
    {
      tag: 'input',
      id: 'link_detail',
      name: 'link_detail',
      label: '링크',
      type: 'text',
      required: false,
      onChange: formik.handleChange,
      values: formik.values.link_detail,
    },
  ];

  return {
    firstFields,
    secondFields,
  };
};

export default useLinkFields;
