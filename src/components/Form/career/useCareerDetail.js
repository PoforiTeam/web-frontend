import { useState } from 'react';
import { resumeApi } from '../../../api/resumeApi';

export default function useCareerDetail(id) {
  const [careerList, setCareerList] = useState(null);

  const getCareer = async () => {
    try {
      const { data } = await resumeApi.career.detail(id);
      setCareerList(data.response.result);
    } catch (err) {
      console.log(err);
    }
  };

  const createCareer = async (values) => {
    try {
      await resumeApi.career.create(values);
      getCareer();
    } catch (err) {
      console.log(err);
    }
  };

  const updateCareer = async (values) => {
    try {
      await resumeApi.career.update(values);
      getCareer();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCareer = async (career_id) => {
    try {
      await resumeApi.career.delete(career_id);
      getCareer();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getCareer,
    createCareer,
    updateCareer,
    deleteCareer,
    careerList,
  };
}
