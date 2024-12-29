import React from 'react';
import EditForm from '@/components/common/EditForm';

const ResumeEditForm = ({ formik, setIsEdit, renderFields }) => {
  const handleCancelClick = () => {
    formik.resetForm();
    setIsEdit(false);
  };

  return (
    <>
      <EditForm onSubmit={formik.handleSubmit} handleCancel={handleCancelClick}>
        {renderFields && renderFields(formik)}
      </EditForm>
    </>
  );
};

export default ResumeEditForm;
