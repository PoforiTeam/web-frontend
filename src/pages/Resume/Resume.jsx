import EducationForm from "../../components/Form/EducationForm";
import ExperienceForm from "../../components/Form/ExperienceForm";
import IntroduceForm from "../../components/Form/IntroduceForm";
import LinksForm from "../../components/Form/LinksForm";
import ProfileForm from "../../components/Form/ProfileForm";
import ProjectForm from "../../components/Form/ProjectForm";
import SkillsForm from "../../components/Form/SkillsForm";
import CareerForm from "../../components/Form/CareerForm";
import Sidebar from "../../components/layout/Sidebar";
import AddButton from "../../components/Resume/AddButton";
import ResumeSection from "../../components/Resume/ResumeSection";
import "./Resume.scss";
import { resumeApi } from "../../api/resumeApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const Resume = () => {
  const { id } = useParams();
  const [res, setRes] = useState({});
  const getResumeDetail = async () => {
    try {
      const { data } = await resumeApi.detail(id);
      console.log(data);
      setRes(data.response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getResumeDetail();
  }, []);
  return (
    <div className="resume">
      <Sidebar />
      <div className="resume-container">
        <div className="resume-header">
          <span>{res.title}</span>
          {/* <div>
            Web <i className="xi-angle-down-min" />
          </div> */}
        </div>
        <div className="resume-main">
          <div className="resume-main-box">
            <ProfileForm />
            <IntroduceForm />
            <EducationForm />
            <ResumeSection title="경력" />
            <CareerForm />
            <ResumeSection title="프로젝트" />
            <ProjectForm />
            <ResumeSection title="경험" />
            <ExperienceForm />
            <ResumeSection title="스킬" />
            <SkillsForm />
            <ResumeSection title="링크" />
            <LinksForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
