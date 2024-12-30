import React, { useState } from 'react';
import ResumeBox from '@/components/Resume/ResumeBox';
import ResumeEditForm from './ResumeEditForm';
import { useParams } from 'react-router-dom';
import useCategoryDetail from '@/hooks/useCategoryDetail';
import useCustomFormik from '@/hooks/useCustomFormik';

const ResumeFormItem = ({
  item,
  initialValues,
  category,
  FormItem,
  renderFields,
}) => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const { updateItem, deleteItem } = useCategoryDetail({ id, category });
  const resumeId = Number(id);
  const formik = useCustomFormik({
    initialValues: {
      ...initialValues,
      ...item,
      resume_id: resumeId,
    },
    onSubmitCallback: (values) => {
      updateItem.mutate(values);
      setIsEdit(false);
    },
  });

  return (
    <>
      {isEdit ? (
        <ResumeEditForm
          formik={formik}
          setIsEdit={setIsEdit}
          renderFields={renderFields}
        />
      ) : (
        <ResumeBox
          handleEdit={() => setIsEdit(true)}
          handleDelete={() => deleteItem.mutate(item[`${category}_id`])}
        >
          {FormItem(item)}
        </ResumeBox>
      )}
    </>
  );
};

export default ResumeFormItem;
