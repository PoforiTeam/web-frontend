import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";
import ResumeSection from "../Resume/ResumeSection";
import SkillsFormItem from "./SkillsFormItem";

const SkillsForm = () => {
  const { id } = useParams();
  const [resList, setResList] = useState([]);
  const [editIndices, setEditIndices] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);

  const getDetail = async () => {
    try {
      const { data } = await resumeApi.skill.detail(id);
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
      <ResumeSection title="스킬" onClick={handleNewForm} />

      {isNewForm && (
        <SkillsFormItem
          id={id}
          res={{
            resume_id: Number(id),
            skill_category: "",
            skill_detail: "",
          }}
          isEdit={true}
          handleEdit={handleNewForm}
          handleCancel={handleCancelNewForm}
          getDetail={getDetail}
        />
      )}
      {resList.map((res, index) => (
        <SkillsFormItem
          key={res.skill_id}
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

export default SkillsForm;
