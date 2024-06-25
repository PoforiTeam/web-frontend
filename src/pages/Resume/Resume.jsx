import EducationForm from "../../components/Form/EducationForm";
import ExperienceForm from "../../components/Form/ExperienceForm";
import IntroForm from "../../components/Form/IntroForm";
import LinksForm from "../../components/Form/LinksForm";
import ProfileForm from "../../components/Form/ProfileForm";
import ProjectForm from "../../components/Form/ProjectForm";
import SkillsForm from "../../components/Form/SkillsForm";
import WorkExperienceForm from "../../components/Form/WorkExperienceForm";
import Sidebar from "../../components/layout/Sidebar";
import AddButton from "../../components/Resume/AddButton";
import ResumeSection from "../../components/Resume/ResumeSection";
import "./Resume.scss";
const Resume = () => (
  <div className="resume">
    <Sidebar />
    <div className="resume-container">
      <div className="resume-header">
        <span>이지혜의 이력서</span>
        <div>
          Web <i className="xi-angle-down-min" />
        </div>
      </div>
      <div className="resume-main">
        <div className="profile-edit">
          <div>
            <h1>이력서 타이틀</h1>
            <p>직무명을 입력하세요</p>
            <p>
              <i className="xi-mail" /> 이메일을 입력하세요
            </p>
            <p>
              <i className="xi-call" /> 핸드폰 번호를 입력하세요
            </p>
          </div>
          <div className="profile-picture">사진을 등록해주세요</div>
        </div>
        <ProfileForm />
        <AddButton section="자기소개" />
        <IntroForm />
        <ResumeSection title="교육" />
        <EducationForm />
        <ResumeSection title="경력" />
        <WorkExperienceForm />
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
);

export default Resume;
