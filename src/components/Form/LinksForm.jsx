import React from 'react';
import CustomInput from '../common/CustomInput';
import ResumeForm from '@/components/common/ResumeForm';
import useLinkFields from '../../hooks/useLinkFields';

const LinksForm = () => {
  const linkInitialValues = {
    resume_id: '',
    link_id: '',
    link_category: '',
    link_detail: '',
  };

  const linkRenderFields = (formik) => {
    const { firstFields, secondFields } = useLinkFields(formik);

    return (
      <>
        <div className="form-container">
          <CustomInput fields={firstFields} />
          <CustomInput fields={secondFields} />
        </div>
      </>
    );
  };

  const linkFormItem = (link) => {
    return (
      <div className="education-item">
        <div>
          <h3>{link.link_category}</h3>
        </div>
        <a href={link.link_detail} target="_blank" rel="noopener noreferrer">
          {link.link_detail}
        </a>
      </div>
    );
  };

  return (
    <ResumeForm
      title={'링크'}
      category={'link'}
      initialValues={linkInitialValues}
      renderFields={linkRenderFields}
      FormItem={linkFormItem}
    />
  );
};

export default LinksForm;
