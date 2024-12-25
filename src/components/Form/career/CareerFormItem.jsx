import React, { useState } from 'react';
import { useFormik } from 'formik';
import ResumeBox from '../../Resume/ResumeBox';
import CareerEditForm from './CareerEditForm';
import { useParams } from 'react-router-dom';
import useCareerDetail from './useCareerDetail';
import useCareerFormik from './useCareerFormik';

const CareerFormItem = ({ res }) => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const { updateEducation, deleteEducation } = useCareerDetail(id);
  const formik = useCareerFormik({
    id,
    res,
    onSubmitCallback: (values) => {
      updateEducation(values);
      setIsEdit(false);
    },
  });

  return (
    <>
      {isEdit && <CareerEditForm formik={formik} setIsEdit={setIsEdit} />}
      <ResumeBox
        handleEdit={() => setIsEdit(true)}
        handleDelete={() => deleteEducation(res.career_id)}
      >
        <div className="education-item">
          <div>
            <h3>{res.company_name}</h3>
            <span>{res.job_title}</span>
            <span>
              {res.career_start_date.replace('-', '. ')} ~{' '}
              {res.career_end_date.replace('-', '. ')}
            </span>
          </div>
          <p>{res.job_detail}</p>
        </div>
      </ResumeBox>
    </>
  );
};

export default CareerFormItem;
