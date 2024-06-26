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
  const [res, setRes] = useState([]);
  const [grab, setGrab] = useState(null);
  const onDragOver = e => {
    e.preventDefault();
  };

  const onDragStart = e => {
    setGrab(e.target);
    e.target.classList.add("grabbing");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };

  const onDragEnd = e => {
    e.target.classList.remove("grabbing");
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = e => {
    let grabPosition = Number(grab.dataset.position);
    let targetPosition = Number(e.target.dataset.position);

    let _list = [...res];
    console.log(" _list[grabPosition]", _list[grabPosition]);
    console.log(" _list[targetPosition]", _list[targetPosition]);

    _list[grabPosition] = _list.splice(
      targetPosition,
      1,
      _list[grabPosition]
    )[0];
    console.log(_list, targetPosition, grabPosition);
    setRes(_list);
  };

  useEffect(() => {
    console.log("grab", grab);
  }, [grab]);

  const getEducationDetail = async () => {
    try {
      const { data } = await resumeApi.education.detail(id);
      console.log(data.response);
      if (data.response.result.length > 0) {
        setEducations(data.response.result);
        setRes(data.response.result);
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

  useEffect(() => {
    console.log(res);
  }, [res]);

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
          index={index}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
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
