import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { resumeApi } from "../../api/resumeApi";
import { SortableItem } from "../DnD/SortableItem"; // Import the SortableItem component

const Sidebar = () => {
  const { id } = useParams();
  const [res, setRes] = useState([]);
  const [orders, setOrders] = useState({});
  const [topOrder, setTopOrder] = useState([]);
  const [openSections, setOpenSections] = useState({
    profile: false,
    introduce: false,
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
      let categoryList = data.response.result;

      let resList = {
        title: data.response.title,
        list: categoryList.map(list => ({
          category: list.category,
          title: sectionsConfig[list.category].title,
          sub: list.item_list?.map(item => ({
            id: item[`${list.category}_id`],
            title: item[sectionsConfig[list.category].subMenuType],
          })),
        })),
      };

      let initialOrders = {};
      categoryList.forEach(list => {
        initialOrders[list.category] = list.item_list.map(
          item => item[`${list.category}_id`]
        );
      });

      setRes(resList);
      setOrders(initialOrders);
      setTopOrder(categoryList.map(list => list.category));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSection = section => {
    console.log(section);
    setOpenSections(prevSections => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  const handleNestedDragEnd = (event, category) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setOrders(prevOrders => {
        const activeIndex = prevOrders[category].indexOf(active.id);
        const overIndex = prevOrders[category].indexOf(over.id);
        const newOrder = arrayMove(
          prevOrders[category],
          activeIndex,
          overIndex
        );

        return {
          ...prevOrders,
          [category]: newOrder,
        };
      });
    }
  };

  const handleTopLevelDragEnd = event => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTopOrder(prevOrder => {
        const activeIndex = prevOrder.indexOf(active.id);
        const overIndex = prevOrder.indexOf(over.id);
        return arrayMove(prevOrder, activeIndex, overIndex);
      });
    }
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
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleTopLevelDragEnd}
          >
            <SortableContext
              items={topOrder}
              strategy={verticalListSortingStrategy}
            >
              <ul className="resume-menu">
                {topOrder.map(category => {
                  const menu = res?.list?.find(
                    item => item.category === category
                  );
                  return (
                    <>
                      <SortableItem
                        key={menu.category}
                        id={menu.category}
                        type="sidebar"
                      >
                        {
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
                          </li>
                        }
                      </SortableItem>

                      {openSections[menu.category] && (
                        <DndContext
                          collisionDetection={closestCenter}
                          onDragEnd={event =>
                            handleNestedDragEnd(event, menu.category)
                          }
                        >
                          <SortableContext
                            items={orders[menu.category]}
                            strategy={verticalListSortingStrategy}
                          >
                            <ul>
                              {orders[menu.category]?.map(id => {
                                const subMenuItem = menu.sub.find(
                                  item => item.id === id
                                );
                                return (
                                  <SortableItem key={id} id={id} type="sidebar">
                                    <li className="resume-child">
                                      <i className="xi-comment" />
                                      <p>{subMenuItem?.title}</p>
                                    </li>
                                  </SortableItem>
                                );
                              })}
                            </ul>
                          </SortableContext>
                        </DndContext>
                      )}
                    </>
                  );
                })}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
