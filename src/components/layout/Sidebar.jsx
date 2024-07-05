import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";

const Sidebar = () => {
  const { id } = useParams();
  const [res, setRes] = useState([]);
  const [openSections, setOpenSections] = useState({
    profile: false,
    education: false,
    career: false,
    project: false,
    experience: false,
    skill: false,
    link: false,
  });

  const sectionsConfig = {
    profile: {
      title: "프로필",
      subMenuType: "profile_title",
    },
    introduce: {
      title: "자기소개",
      subMenuType: "introduce_text",
    },
    education: {
      title: "교육",
      subMenuType: "education_name",
    },
    career: {
      title: "경력",
      subMenuType: "company_name",
    },
    project: {
      title: "프로젝트",
      subMenuType: "project_name",
    },
    experience: {
      title: "경험",
      subMenuType: "experience_name",
    },
    skill: {
      title: "스킬",
      subMenuType: "skill_category",
    },
    link: {
      title: "링크",
      subMenuType: "link_category",
    },
  };

  const getResumeDetail = async () => {
    try {
      const { data } = await resumeApi.detail(id);
      console.log(data.response.result);
      let categoryList = data.response.result;
      let resList = {
        title: data.response.title,
        list: categoryList.map(list => {
          return {
            category: list.category,
            title: sectionsConfig[list.category].title,
            sub: list.itme_list?.map(item => {
              return {
                title: item[sectionsConfig[list.category].subMenuType],
              };
            }),
          };
        }),
      };

      console.log(resList);
      setRes(resList);
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
            {res?.list?.map(menu => (
              <li>
                <div onClick={() => toggleSection(menu.category)}>
                  <i
                    className={
                      openSections[menu.category]
                        ? "xi-angle-down-min"
                        : "xi-angle-right-min"
                    }
                  />
                  <p>{menu.title}</p>
                </div>
                {openSections[menu.category] && (
                  <ul>
                    {menu?.sub?.map(sub_menu => (
                      <li className="resume-child">
                        <i className="xi-comment" />
                        <p>{sub_menu?.title}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
