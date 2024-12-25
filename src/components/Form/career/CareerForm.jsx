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
  const { getEducation, createEducation, deleteEducation, educationList } =
    useCareerDetail(id);

  const formik = useCareerFormik({
    id,
    onSubmitCallback: (values) => {
      createEducation(values);
      setIsNewForm(false);
    },
  });

  useEffect(() => {
    getEducation();
  }, [educationList]);

  return (
    <>
      <ResumeSection title="경력" onClick={() => setIsNewForm(true)} />

      {isNewForm && <CareerEditForm formik={formik} setIsEdit={setIsNewForm} />}

      {educationList.map((res) => (
        <CareerFormItem
          key={res.career_id}
          res={res}
          getEducation={getEducation}
          deleteEducation={deleteEducation}
        />
      ))}
    </>
  );
};

export default CareerForm;
