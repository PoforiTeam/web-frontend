import EducationForm from "../../components/Form/EducationForm";
import ExperienceForm from "../../components/Form/ExperienceForm";
import IntroduceForm from "../../components/Form/IntroduceForm";
import LinksForm from "../../components/Form/LinksForm";
import ProfileForm from "../../components/Form/ProfileForm";
import ProjectForm from "../../components/Form/ProjectForm";
import SkillsForm from "../../components/Form/SkillsForm";
import CareerForm from "../../components/Form/CareerForm";
import Sidebar from "../../components/layout/Sidebar";
import "./Resume.scss";
import { resumeApi } from "../../api/resumeApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const formComponents = {
  profile: ProfileForm,
  introduce: IntroduceForm,
  education: EducationForm,
  career: CareerForm,
  project: ProjectForm,
  experience: ExperienceForm,
  skill: SkillsForm,
  link: LinksForm,
};

const Resume = () => {
  const { id } = useParams();
  const [res, setRes] = useState([]);
  const [isUpdate, setUpdate] = useState(false);

  const getResumeDetail = async () => {
    try {
      const { data } = await resumeApi.detail(id);
      console.log("레쥬메", data);
      setRes(data.response.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(isUpdate);
    getResumeDetail();
    setUpdate(false);
  }, [isUpdate]);

  useEffect(() => {
    getResumeDetail();
  }, []);

  return (
    <>
      <Sidebar isUpdate={isUpdate} setUpdate={setUpdate} />
      <div className="resume">
        <div className="resume-container">
          <div className="resume-header">
            <span>{res.title}</span>
          </div>
          <div className="resume-main">
            <div className="resume-main-box">
              {res
                ?.sort((a, b) => a.top_order - b.top_order) // top_order에 따라 정렬
                .map((section) => {
                  const Component = formComponents[section.category];
                  return (
                    <Component
                      key={section.category}
                      isUpdate={isUpdate}
                      setUpdate={setUpdate}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
