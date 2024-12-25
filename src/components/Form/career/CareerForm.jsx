import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import ResumeSection from '../../Resume/ResumeSection';
import CareerFormItem from './CareerFormItem';
import { resumeApi } from '../../../api/resumeApi';
import CareerEditForm from './CareerEditForm';

const CareerForm = () => {
  const { id } = useParams();
  const [educationList, setEducationList] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);

  const initialValues = {
    resume_id: Number(id),
    career_id: '',
    company_name: '',
    job_title: '',
    career_status: '',
    career_start_date: '',
    career_end_date: '',
    job_detail: '',
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      createEducation(values);
      setIsNewForm(false);
    },
  });

  const getEducation = async () => {
    try {
      const { data } = await resumeApi.career.detail(id);
      setEducationList(data.response.result);
    } catch (err) {
      console.log(err);
    }
  };

  const createEducation = async (values) => {
    try {
      await resumeApi.career.create(values);
      getEducation();
    } catch (err) {
      console.log(err);
    }
  };

  const updateEducation = async (values) => {
    try {
      await resumeApi.career.update(values);
      getEducation();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEducation = async (career_id) => {
    try {
      await resumeApi.career.delete(career_id);
      getEducation();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getEducation();
  }, []);

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
