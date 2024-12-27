import React, { useState } from 'react';
import ResumeBox from '../../Resume/ResumeBox';
import CareerEditForm from './CareerEditForm';
import { useParams } from 'react-router-dom';
import useCareerDetail from '@/hooks/useCareerDetail';
import useCustomFormik from '@/hooks/useCustomFormik';

const CareerFormItem = ({ career }) => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const { updateCareer, deleteCareer } = useCareerDetail(id);
  const formik = useCustomFormik({
    initialValues: {
      resume_id: Number(id),
      career_id: Number(career.career_id) || '',
      company_name: career.company_name || '',
      job_title: career.job_title || '',
      career_status: career.career_status || '',
      career_start_date: career.career_start_date || '',
      career_end_date: career.career_end_date || '',
      job_detail: career.job_detail || '',
    },
    onSubmitCallback: (values) => {
      updateCareer.mutate(values);
      setIsEdit(false);
    },
  });

  return (
    <>
      {isEdit && <CareerEditForm formik={formik} setIsEdit={setIsEdit} />}
      <ResumeBox
        handleEdit={() => setIsEdit(true)}
        handleDelete={() => deleteCareer.mutate(career.career_id)}
      >
        <div className="education-item">
          <div>
            <h3>{career.company_name}</h3>
            <span>{career.job_title}</span>
            <span>
              {career.career_start_date.replace('-', '. ')} ~{' '}
              {career.career_end_date.replace('-', '. ')}
            </span>
          </div>
          <p>{career.job_detail}</p>
        </div>
      </ResumeBox>
    </>
  );
};

export default CareerFormItem;
