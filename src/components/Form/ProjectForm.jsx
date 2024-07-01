import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";
import ResumeSection from "../Resume/ResumeSection";
import ProjectFormItem from "./ProjectFormItem";

const ProjectForm = () => {
  const { id } = useParams();
  const [resList, setResList] = useState([]);
  const [editIndices, setEditIndices] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);

  const getDetail = async () => {
    try {
      const { data } = await resumeApi.project.detail(id);
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
      <ResumeSection title="프로젝트" onClick={handleNewForm} />

      {isNewForm && (
        <ProjectFormItem
          id={id}
          res={{
            resume_id: Number(id),
            project_name: "",
            project_agency: "",
            project_status: "",
            project_start_date: "",
            project_end_date: "",
            project_detail: "",
            project_role: "",
            project_tech: "",
          }}
          isEdit={true}
          handleEdit={handleNewForm}
          handleCancel={handleCancelNewForm}
          getDetail={getDetail}
        />
      )}
      {resList.map((res, index) => (
        <ProjectFormItem
          key={res.project_id}
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

export default ProjectForm;
