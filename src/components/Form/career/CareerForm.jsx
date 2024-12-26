import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResumeSection from '../../Resume/ResumeSection';
import CareerFormItem from './CareerFormItem';
import CareerEditForm from './CareerEditForm';
import useCareerDetail from './useCareerDetail';
import useCareerFormik from './useCareerFormik';

const CareerForm = () => {
  const { id } = useParams();
  const [isNewForm, setIsNewForm] = useState(false);
  const { getCareer, createCareer, careerList } = useCareerDetail(id);

  const formik = useCareerFormik({
    id,
    onSubmitCallback: (values) => {
      createCareer(values);
      setIsNewForm(false);
    },
  });

  useEffect(() => {
    getCareer();
  }, []);

  return (
    <>
      <ResumeSection title="경력" onClick={() => setIsNewForm(true)} />

      {isNewForm && <CareerEditForm formik={formik} setIsEdit={setIsNewForm} />}

      {careerList &&
        careerList.map((res) => (
          <CareerFormItem key={res.career_id} res={res} />
        ))}
    </>
  );
};

export default CareerForm;
