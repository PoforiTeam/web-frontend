import React from "react";
import AddButton from "./AddButton";
import "./Resume.scss";

const ResumeSection = ({ title }) => {
  return (
    <div className="resume-section">
      <h2>{title}</h2>
      <AddButton section={title} />
    </div>
  );
};

export default ResumeSection;
