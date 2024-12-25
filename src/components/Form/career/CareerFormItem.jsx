import React, { useState } from 'react';
import { useFormik } from 'formik';
import ResumeBox from '../../Resume/ResumeBox';
import { resumeApi } from '../../../api/resumeApi';
import CareerEditForm from './CareerEditForm';
import { useParams } from 'react-router-dom';

const CareerFormItem = ({ res, getEducation, deleteEducation }) => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const initialValues = {
    resume_id: Number(id),
    career_id: Number(res.career_id) || '',
    company_name: res.company_name || '',
    job_title: res.job_title || '',
    career_status: res.career_status || '',
    career_start_date: res.career_start_date || '',
    career_end_date: res.career_end_date || '',
    job_detail: res.job_detail || '',
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      updateEducation(values);
      setIsEdit(false);
    },
  });

  const updateEducation = async (values) => {
    try {
      await resumeApi.career.update(values);
      getEducation();
    } catch (err) {
      console.log(err);
    }
  };

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
