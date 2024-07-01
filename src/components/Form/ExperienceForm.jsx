import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";
import ResumeSection from "../Resume/ResumeSection";
import ExperienceFormItem from "./ExperienceFormItem";

const ExperienceForm = () => {
  const { id } = useParams();
  const [resList, setResList] = useState([]);
  const [editIndices, setEditIndices] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);

  const getDetail = async () => {
    try {
      const { data } = await resumeApi.experience.detail(id);
      console.log(data.response);
      setResList(data.response.result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = index => {
    setEditIndices(prev => [...prev, index]);
  };

  const handleCancel = index => {
    setEditIndices(prev => prev.filter(i => i !== index));
  };

  const handleNewForm = () => {
    setIsNewForm(true);
  };

  const handleCancelNewForm = () => {
    setIsNewForm(false);
  };

  useEffect(() => {
    getDetail();
  }, []);
  return (
    <>
      <ResumeSection title="경험" onClick={handleNewForm} />

      {isNewForm && (
        <ExperienceFormItem
          id={id}
          res={{
            resume_id: Number(id),
            experience_category: "",
            experience_name: "",
            experience_agency: "",
            experience_is_period: "",
            experience_start_date: "",
            experience_end_date: "",
            experience_detail: "",
          }}
          isEdit={true}
          handleEdit={handleNewForm}
          handleCancel={handleCancelNewForm}
          getDetail={getDetail}
        />
      )}
      {resList.map((res, index) => (
        <ExperienceFormItem
          key={res.experience_id}
          id={id}
          res={res}
          isEdit={editIndices.includes(index)}
          handleEdit={() => handleEdit(index)}
          handleCancel={() => handleCancel(index)}
          getDetail={getDetail}
        />
      ))}
    </>
  );
};

export default ExperienceForm;
