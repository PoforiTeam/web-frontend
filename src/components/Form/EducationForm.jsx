import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";
import ResumeSection from "../Resume/ResumeSection";
import EducationFormItem from "./EducationFormItem";

const EducationForm = () => {
  const { id } = useParams();
  const [educations, setEducations] = useState([]);
  const [editIndices, setEditIndices] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);

  const getEducationDetail = async () => {
    try {
      const { data } = await resumeApi.education.detail(id);
      console.log(data.response);
      if (data.response.result.length > 0) {
        setEducations(data.response.result);
      }
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
    getEducationDetail();
  }, []);

  return (
    <>
      <ResumeSection title="교육" onClick={handleNewForm} />

      {isNewForm && (
        <EducationFormItem
          id={id}
          education={{
            resume_id: Number(id),
            education_category: "",
            education_name: "",
            major: "",
            education_status: "",
            enter_date: "",
            graduate_date: "",
            detail: "",
          }}
          isEdit={true}
          handleEdit={handleNewForm}
          handleCancel={handleCancelNewForm}
          getEducationDetail={getEducationDetail}
        />
      )}
      {educations.map((education, index) => (
        <EducationFormItem
          key={education.education_id}
          id={id}
          education={education}
          isEdit={editIndices.includes(index)}
          handleEdit={() => handleEdit(index)}
          handleCancel={() => handleCancel(index)}
          getEducationDetail={getEducationDetail}
        />
      ))}
    </>
  );
};

export default EducationForm;
