import { useRef } from 'react';

const useProjectFields = (formik) => {
  const projectDetailTextareaRef = useRef(null);
  const projectRoleTextareaRef = useRef(null);
  const usedSkillsTextareaRef = useRef(null);

  const firstFields = [
    {
      tag: 'input',
      id: 'project_name',
      name: 'project_name',
      label: '프로젝트명',
      type: 'text',
      required: true,
      onChange: formik.handleChange,
      values: formik.values.project_name,
    },
  ];

  const secondFields = [
    {
      tag: 'input',
      id: 'project_agency',
      name: 'project_agency',
      label: '소속/기관',
      type: 'text',
      required: false,
      onChange: formik.handleChange,
      values: formik.values.project_agency,
    },
  ];

  const thirdFields = [
    {
      tag: 'select',
      id: 'project_status',
      name: 'project_status',
      label: '진행 여부',
      type: 'text',
      required: true,
      onChange: formik.handleChange,
      values: formik.values.project_status,
      options: ['완료', '진행중'],
    },
    {
      tag: 'input',
      id: 'project_start_date',
      name: 'project_start_date',
      label: '입학년월',
      type: 'month',
      onChange: formik.handleChange,
      values: formik.values.project_start_date,
    },
    {
      tag: 'input',
      id: 'project_end_date',
      name: 'project_end_date',
      label: '졸업년월',
      type: 'month',
      onChange: formik.handleChange,
      values: formik.values.project_end_date,
    },
  ];

  const textareaFields = [
    [
      {
        tag: 'textarea',
        id: 'project_detail',
        name: 'project_detail',
        label: '프로젝트 소개',
        maxLength: '500',
        type: 'text',
        onChange: formik.handleChange,
        values: formik.values.project_detail,
        textareaRef: projectDetailTextareaRef,
      },
    ],
    [
      {
        tag: 'textarea',
        id: 'project_role',
        name: 'project_role',
        label: '나의 역할',
        maxLength: '500',
        type: 'text',
        onChange: formik.handleChange,
        values: formik.values.project_role,
        textareaRef: projectRoleTextareaRef,
      },
    ],
    [
      {
        tag: 'textarea',
        id: 'project_tech',
        name: 'project_tech',
        label: '사용 기술',
        maxLength: '500',
        type: 'text',
        onChange: formik.handleChange,
        values: formik.values.project_tech,
        textareaRef: usedSkillsTextareaRef,
      },
    ],
  ];

  return {
    firstFields,
    secondFields,
    thirdFields,
    textareaFields,
  };
};

export default useProjectFields;
