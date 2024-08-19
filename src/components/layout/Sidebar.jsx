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

const Sidebar = ({ isUpdate, setUpdate }) => {
  const { id } = useParams();
  const [res, setRes] = useState([]);
  const [orders, setOrders] = useState({});
  const [topOrder, setTopOrder] = useState([]);
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
      icon: "xi-user-address",
    },
    introduce: {
      title: "자기소개",
    },
    education: {
      title: "교육",
      subMenuType: "education_name",
      icon: "xi-school",
    },
    career: {
      title: "경력",
      subMenuType: "company_name",
      icon: "xi-business",
    },
    project: {
      title: "프로젝트",
      subMenuType: "project_name",
      icon: "xi-business",
    },
    experience: {
      title: "경험",
      subMenuType: "experience_name",
      icon: "xi-library",
    },
    skill: {
      title: "스킬",
      subMenuType: "skill_category",
      icon: "xi-trophy",
    },
    link: {
      title: "링크",
      subMenuType: "link_category",
      icon: "xi-puzzle",
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
          icon: sectionsConfig[list.category].icon,
          sub: list.item_list?.map(item => ({
            id: item[`${list.category}_id`],
            title: item[sectionsConfig[list.category].subMenuType],
          })),
        })),
      };

      let initialOrders = {};
      categoryList.forEach(list => {
        initialOrders[list.category] = list.item_list
          .sort(
            (a, b) =>
              a[`${list.category}_sub_order`] - b[`${list.category}_sub_order`]
          )
          .map(item => item[`${list.category}_id`]);
      });
      console.log(resList, initialOrders);
      setRes(resList);
      setOrders(initialOrders);
      setTopOrder(
        categoryList
          .filter(
            list => list.category !== "profile" && list.category !== "introduce"
          )
          .sort((a, b) => a.top_order - b.top_order)
          .map(list => list.category)
      );
      console.log(resList, initialOrders, topOrder);
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
        let detailOrderList = {
          resume_category: category,
          detail_orders: newOrder.map((key, index) => ({
            item_id: key,
            item_order: index + 1,
          })),
        };
        console.log("newOrder", detailOrderList);
        updateDetailOrder(detailOrderList);
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
        const newOrder = arrayMove(prevOrder, activeIndex, overIndex);
        updateTopOrder(newOrder);
        return newOrder;
      });
    }
  };

  const updateTopOrder = async list => {
    try {
      let topOrderList = {
        resume_id: Number(id),
        profile_order: 0,
        introduce_order: 1,
      };
      list.forEach((key, index) => {
        topOrderList[`${key}_order`] = index + 2;
      });
      await resumeApi.order.category(topOrderList);
      setUpdate(true);
    } catch (e) {
      console.log(e);
    }
  };

  const updateDetailOrder = async list => {
    try {
      await resumeApi.order.detail(list);
      setUpdate(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getResumeDetail();
  }, [id]);

  useEffect(() => {
    isUpdate && getResumeDetail();
  }, [isUpdate]);

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
                <li>
                  <div onClick={() => toggleSection("profile")}>
                    <i
                      className={
                        openSections["profile"]
                          ? "xi-angle-down-min"
                          : "xi-angle-right-min"
                      }
                    />
                    <p>프로필</p>
                  </div>
                  {openSections["profile"] && (
                    <ul>
                      <li className="resume-child">
                        <i className={sectionsConfig["profile"].icon} />
                        <p>자기소개</p>
                      </li>
                    </ul>
                  )}
                </li>
                {topOrder.map(category => {
                  const menu = res?.list?.find(
                    item => item.category === category
                  );
                  return (
                    <SortableItem
                      key={menu?.category}
                      id={menu?.category}
                      type="sidebar"
                      plus={
                        openSections[menu?.category] && (
                          <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={event =>
                              handleNestedDragEnd(event, menu?.category)
                            }
                          >
                            <SortableContext
                              items={orders[menu?.category]}
                              strategy={verticalListSortingStrategy}
                            >
                              <ul>
                                {orders[menu?.category]?.map(id => {
                                  const subMenuItem = menu.sub.find(
                                    item => item.id === id
                                  );
                                  return (
                                    <SortableItem
                                      key={id}
                                      id={id}
                                      type="sidebar"
                                    >
                                      <li className="resume-child">
                                        <i className={menu?.icon} />
                                        <p>{subMenuItem?.title}</p>
                                      </li>
                                    </SortableItem>
                                  );
                                })}
                              </ul>
                            </SortableContext>
                          </DndContext>
                        )
                      }
                    >
                      <li>
                        <div onClick={() => toggleSection(menu?.category)}>
                          <i
                            className={
                              openSections[menu?.category]
                                ? "xi-angle-down-min"
                                : "xi-angle-right-min"
                            }
                          />
                          <p>{menu?.title}</p>
                        </div>
                      </li>
                    </SortableItem>
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
