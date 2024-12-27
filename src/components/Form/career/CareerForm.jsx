import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ResumeSection from '../../Resume/ResumeSection';
import CareerFormItem from './CareerFormItem';
import CareerEditForm from './CareerEditForm';
import useCareerDetail from '@/hooks/useCareerDetail';
import useCareerFormik from '@/hooks/useCareerFormik';

const CareerForm = () => {
  const { id } = useParams();
  const [isNewForm, setIsNewForm] = useState(false);
  const { createCareer, careerList } = useCareerDetail(id);

  const formik = useCareerFormik({
    id,
    onSubmitCallback: (values) => {
      createCareer.mutate(values);
      formik.resetForm();
      setIsNewForm(false);
    },
  });

  return (
    <>
      <ResumeSection title="경력" onClick={() => setIsNewForm(true)} />

      {isNewForm && <CareerEditForm formik={formik} setIsEdit={setIsNewForm} />}

      {careerList &&
        careerList.map((career) => (
          <CareerFormItem key={career.career_id} career={career} />
        ))}
    </>
  );
};

export default CareerForm;
