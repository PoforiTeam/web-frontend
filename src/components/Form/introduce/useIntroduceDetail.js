import { useState } from 'react';
import { resumeApi } from '../../../api/resumeApi';

export default function useIntroduceDetail(id) {
  const [introduce, setIntroduce] = useState({});

  const getIntroduce = async () => {
    try {
      const { data } = await resumeApi.introduce.detail(id);
      if (Object.keys(data.response).length > 0) {
        setIntroduce(data.response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createIntroduce = async (values) => {
    try {
      await resumeApi.introduce.create(values);
      getIntroduce();
    } catch (err) {
      console.log(err);
    }
  };

  const updateIntroduce = async (values) => {
    try {
      await resumeApi.introduce.update(values);
      getIntroduce();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteIntroduce = async (introduce_id) => {
    try {
      await resumeApi.introduce.delete(introduce_id);
      getIntroduce();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    introduce,
    getIntroduce,
    createIntroduce,
    updateIntroduce,
    deleteIntroduce,
  };
}
