import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ResumeSection from '@/components/Resume/ResumeSection';
import ResumeFormItem from './ResumeFormItem';
import ResumeEditForm from './ResumeEditForm';
import useCustomFormik from '@/hooks/useCustomFormik';
import useCategoryDetail from '@/hooks/useCategoryDetail';

const ResumeForm = ({
  title,
  category,
  initialValues,
  renderFields,
  FormItem,
  customQuery,
}) => {
  const { id } = useParams();
  const [isNewForm, setIsNewForm] = useState(false);
  const { createItem, itemList } = useCategoryDetail({
    id,
    category,
    customQuery,
  });
  const resumeId = Number(id);

  const formik = useCustomFormik({
    initialValues: {
      ...initialValues,
      resume_id: resumeId,
    },
    onSubmitCallback: (values) => {
      console.log(values);
      createItem.mutate(values);
      formik.resetForm();
      setIsNewForm(false);
    },
  });

  return (
    <>
      <ResumeSection title={title} onClick={() => setIsNewForm(true)} />

      {isNewForm && (
        <ResumeEditForm
          formik={formik}
          setIsEdit={setIsNewForm}
          renderFields={renderFields}
        />
      )}

      {itemList &&
        itemList.map((item) => (
          <ResumeFormItem
            key={item[`${category}_id`]}
            item={item}
            category={category}
            FormItem={FormItem}
            initialValues={initialValues}
            renderFields={renderFields}
          />
        ))}
    </>
  );
};

export default ResumeForm;
