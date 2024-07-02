import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";

const Sidebar = () => {
  const { id } = useParams();
  const [res, setRes] = useState({});
  const [openSections, setOpenSections] = useState({
    profile: false,
    education: false,
    career: false,
    project: false,
    experience: false,
    skill: false,
    link: false,
  });

  const getResumeDetail = async () => {
    try {
      const { data } = await resumeApi.detail(id);
      console.log(data);
      setRes(data.response);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSection = section => {
    setOpenSections(prevSections => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  useEffect(() => {
    getResumeDetail();
  }, [id]);

  return (
    <aside className="sidebar">
      <nav>
        <ul className="top-menu">
          <li>
            <i className="xi-home" />
            메인 화면으로
          </li>
          <li>
            <i className="xi-cog" />
            설정
          </li>
        </ul>
        <div className="divider"></div>
        <div className="menu-section">
          <h3>메뉴</h3>
          <h4>{res?.title}</h4>
          <ul className="resume-menu">
            <li>
              <div onClick={() => toggleSection("profile")}>
                <i
                  className={
                    openSections.profile
                      ? "xi-angle-down-min"
                      : "xi-angle-right-min"
                  }
                />{" "}
                프로필
              </div>
              {openSections.profile && (
                <ul>
                  <li>{res.profile?.profile_title}</li>
                </ul>
              )}
            </li>
            <li>
              <div onClick={() => toggleSection("education")}>
                <i
                  className={
                    openSections.education
                      ? "xi-angle-down-min"
                      : "xi-angle-right-min"
                  }
                />{" "}
                교육
              </div>
              {openSections.education && (
                <ul>
                  {res.education?.map(edu => (
                    <li key={edu.education_id}>
                      {edu.education_category}: {edu.education_name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <div onClick={() => toggleSection("career")}>
                <i
                  className={
                    openSections.career
                      ? "xi-angle-down-min"
                      : "xi-angle-right-min"
                  }
                />{" "}
                경력
              </div>
              {openSections.career && (
                <ul>
                  {res.career?.map(car => (
                    <li key={car.career_id}>
                      {car.company_name}: {car.job_title}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <div onClick={() => toggleSection("project")}>
                <i
                  className={
                    openSections.project
                      ? "xi-angle-down-min"
                      : "xi-angle-right-min"
                  }
                />{" "}
                프로젝트
              </div>
              {openSections.project && (
                <ul>
                  {res.project?.map(proj => (
                    <li key={proj.project_id}>{proj.project_name}</li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <div onClick={() => toggleSection("experience")}>
                <i
                  className={
                    openSections.experience
                      ? "xi-angle-down-min"
                      : "xi-angle-right-min"
                  }
                />{" "}
                경험
              </div>
              {openSections.experience && (
                <ul>
                  {res.experience?.map(exp => (
                    <li key={exp.experience_id}>{exp.experience_name}</li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <div onClick={() => toggleSection("skill")}>
                <i
                  className={
                    openSections.skill
                      ? "xi-angle-down-min"
                      : "xi-angle-right-min"
                  }
                />{" "}
                스킬
              </div>
              {openSections.skill && (
                <ul>
                  {res.skill?.map(skill => (
                    <li key={skill.skill_id}>
                      {skill.skill_category}: {skill.skill_detail}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <div onClick={() => toggleSection("link")}>
                <i
                  className={
                    openSections.link
                      ? "xi-angle-down-min"
                      : "xi-angle-right-min"
                  }
                />{" "}
                링크
              </div>
              {openSections.link && (
                <ul>
                  {res.link?.map(link => (
                    <li key={link.link_id}>
                      <a
                        href={link.link_detail}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.link_category}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
