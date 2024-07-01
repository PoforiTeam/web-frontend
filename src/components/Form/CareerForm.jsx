import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";
import ResumeSection from "../Resume/ResumeSection";
import CareerFormItem from "./CareerFormItem";

const CareerForm = () => {
  const { id } = useParams();
  const [resList, setResList] = useState([]);
  const [editIndices, setEditIndices] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);

  const getDetail = async () => {
    try {
      const { data } = await resumeApi.career.detail(id);
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
      <ResumeSection title="경력" onClick={handleNewForm} />

      {isNewForm && (
        <CareerFormItem
          id={id}
          res={{
            resume_id: Number(id),
            company_name: "",
            job_title: "",
            career_status: "",
            career_start_date: "",
            career_end_date: "",
            job_detail: "",
          }}
          isEdit={true}
          handleEdit={handleNewForm}
          handleCancel={handleCancelNewForm}
          getDetail={getDetail}
        />
      )}
      {resList.map((res, index) => (
        <CareerFormItem
          key={res.career_id}
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

export default CareerForm;
