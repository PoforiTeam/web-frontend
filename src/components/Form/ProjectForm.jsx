import React from 'react';
import Tips from '../common/Tips';
import CustomInput from '../common/CustomInput';
import ResumeForm from '@/components/common/ResumeForm';
import useProjectFields from '../../hooks/useProjectFields';

const ProjectForm = () => {
  const projectInitialValues = {
    resume_id: '',
    project_name: '',
    project_agency: '',
    project_status: '',
    project_start_date: '',
    project_end_date: '',
    project_detail: '',
    project_role: '',
    project_tech: '',
  };

  const projectRenderFields = (formik) => {
    const { firstFields, secondFields, thirdFields, textareaFields } =
      useProjectFields(formik);

    const tipsData = [
      '프로젝트는 지원할 업무와 가장 관련된 순으로 작성하는 것을 추천해요.',
    ];
    return (
      <>
        <div className="form-container">
          <CustomInput fields={firstFields} />
          <CustomInput fields={secondFields} />
          <div className="form-group-flex">
            <CustomInput fields={thirdFields} />
          </div>
          <Tips list={tipsData} />
          {textareaFields.map((field, index) => (
            <CustomInput key={index} fields={field} />
          ))}
        </div>
      </>
    );
  };

  const projectFormItem = (project) => {
    return (
      <div className="project-item">
        <div>
          <h1>{project.project_name}</h1>
          <span>
            {project.project_start_date.replace('-', '. ')} ~{' '}
            {project.project_end_date.replace('-', '. ')}
          </span>
        </div>
        <p>{project.project_detail}</p>
        <div>
          <h3>나의 역할</h3>
          <p>{project.project_role}</p>
        </div>
        <div>
          <h3>사용 기술</h3>
          <p>{project.project_tech}</p>
        </div>
      </div>
    );
  };

  return (
    <ResumeForm
      title={'프로젝트'}
      category={'project'}
      initialValues={projectInitialValues}
      renderFields={projectRenderFields}
      FormItem={projectFormItem}
    />
  );
};

export default ProjectForm;
