import React, { useState } from 'react';
import { resumeApi } from '../../../api/resumeApi';

export default function useCareerDetail(id) {
  const [educationList, setEducationList] = useState([]);

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

  return {
    getEducation,
    createEducation,
    updateEducation,
    deleteEducation,
    educationList,
  };
}
