import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddButton from '../../Resume/AddButton';
import ResumeBox from '../../Resume/ResumeBox';
import IntroduceEditForm from './IntroduceEditForm';
import useIntroduceDetail from '@/hooks/useIntroduceDetail';
import useCustomFormik from '../../../hooks/useCustomFormik';

const IntroduceForm = () => {
  const { id } = useParams();
  const { introduce, createIntroduce, updateIntroduce, deleteIntroduce } =
    useIntroduceDetail(id);
  const [isEdit, setEdit] = useState(false);
  const textareaRef = useRef(null);

  const formik = useCustomFormik({
    initialValues: {
      resume_id: introduce?.resume_id || Number(id),
      introduce_id: introduce?.introduce_id || '',
      introduce_text: introduce?.introduce_text || '',
    },
    onSubmitCallback: (values) => {
      introduce.introduce_text
        ? updateIntroduce.mutate(values)
        : createIntroduce.mutate(values);
      setEdit(false);
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setEdit(false);
  };

  const handleDelete = () => {
    deleteIntroduce.mutate(introduce.introduce_id);
    formik.resetForm();
  };

  if (isEdit) {
    return (
      <IntroduceEditForm
        formik={formik}
        textareaRef={textareaRef}
        handleCancel={handleCancel}
      />
    );
  }

  if (formik.values.introduce_text.length > 0) {
    return (
      <ResumeBox handleEdit={() => setEdit(true)} handleDelete={handleDelete}>
        <div className="introduce-item">{introduce?.introduce_text}</div>
      </ResumeBox>
    );
  }

  return <AddButton section="자기소개" onClick={() => setEdit(true)} />;
};

export default IntroduceForm;
