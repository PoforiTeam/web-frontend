import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import AddButton from '../../Resume/AddButton';
import ResumeBox from '../../Resume/ResumeBox';
import IntroduceEditForm from './IntroduceEditForm';
import useIntroduceDetail from './useIntroduceDetail';
import useAdjustTextareaHeight from '../../../hooks/useAdjustTextareaHeight';

const IntroduceForm = () => {
  const { id } = useParams();
  const {
    introduce,
    getIntroduce,
    createIntroduce,
    updateIntroduce,
    deleteIntroduce,
  } = useIntroduceDetail(id);
  const [isEdit, setEdit] = useState(false);
  const textareaRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      resume_id: introduce?.resume_id || Number(id),
      introduce_id: introduce?.introduce_id || '',
      introduce_text: introduce?.introduce_text || '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      Object.keys(introduce).length > 0
        ? updateIntroduce(values)
        : createIntroduce(values);
      setEdit(false);
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setEdit(false);
  };

  const handleDelete = () => {
    deleteIntroduce(introduce.introduce_id);
    formik.resetForm();
  };

  useEffect(() => {
    getIntroduce();
  }, []);

  useAdjustTextareaHeight(textareaRef, formik.values.introduce_text);

  if (isEdit) {
    return (
      <IntroduceEditForm
        formik={formik}
        textareaRef={textareaRef}
        handleCancel={handleCancel}
      />
    );
  }

  if (Object.keys(introduce).length > 0) {
    return (
      <ResumeBox handleEdit={() => setEdit(true)} handleDelete={handleDelete}>
        <div className="introduce-item">{introduce.introduce_text}</div>
      </ResumeBox>
    );
  }

  return <AddButton section="자기소개" onClick={() => setEdit(true)} />;
};

export default IntroduceForm;
