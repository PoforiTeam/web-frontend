import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
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
  const [activeId, setActiveId] = useState(null);
  const [activeSubId, setActiveSubId] = useState(null);
  const [openSections, setOpenSections] = useState({
    profile: false,
    education: false,
    career: false,
    project: false,
    experience: false,
    skill: false,
    link: false,
  });
  const [visibility, setVisibility] = useState({});
  const toggleVisibility = (category, id) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [category]: {
        ...prevVisibility[category],
        [id]: !prevVisibility[category]?.[id],
      },
    }));
  };
  const toggleVisibilityMain = (category, id) => {
    setVisibility((prevVisibility) => {
      // Get the current visibility for the given category
      const currentCategoryVisibility = prevVisibility[category]?.[id];

      // Determine the new visibility state based on the current state
      const newVisibilityState = !currentCategoryVisibility;

      // Create a new visibility object based on the new state
      const updatedVisibility = {
        ...prevVisibility,
        [category]: {
          ...prevVisibility[category],
          [id]: newVisibilityState,
          ...(newVisibilityState
            ? Object.fromEntries(
                Object.keys(prevVisibility[category] || {}).map((key) => [
                  key,
                  true,
                ])
              )
            : Object.fromEntries(
                Object.keys(prevVisibility[category] || {}).map((key) => [
                  key,
                  false,
                ])
              )),
        },
      };

      return updatedVisibility;
    });
  };
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
        list: categoryList.map((list) => ({
          category: list.category,
          title: sectionsConfig[list.category].title,
          icon: sectionsConfig[list.category].icon,
          sub: list.item_list?.map((item) => ({
            id: item[`${list.category}_id`],
            title: item[sectionsConfig[list.category].subMenuType],
          })),
        })),
      };

      let initialOrders = {};
      categoryList.forEach((list) => {
        initialOrders[list.category] = list.item_list
          .sort(
            (a, b) =>
              a[`${list.category}_sub_order`] - b[`${list.category}_sub_order`]
          )
          .map((item) => item[`${list.category}_id`]);
      });
      console.log(resList, initialOrders);

      let initialVisibility = {};
      categoryList.forEach((list) => {
        initialVisibility[list.category] = { main: true };
        list.item_list.reduce((_, item) => {
          const isActive =
            item[`${list.category}_is_active`] !== null
              ? item[`${list.category}_is_active`]
              : true;
          initialVisibility[list.category][item[`${list.category}_id`]] =
            isActive;
        }, {});
      });
      console.log("initialVisiable", initialVisibility);
      setVisibility(initialVisibility);
      setRes(resList);
      setOrders(initialOrders);
      setTopOrder(
        categoryList
          .filter(
            (list) =>
              list.category !== "profile" && list.category !== "introduce"
          )
          .sort((a, b) => a.top_order - b.top_order)
          .map((list) => list.category)
      );
      console.log(resList, initialOrders, topOrder);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSection = (section) => {
    console.log(section);
    setOpenSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  const handleNestedDragEnd = (event, category) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setOrders((prevOrders) => {
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
      setActiveSubId(null);
    }
  };

  const handleTopLevelDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTopOrder((prevOrder) => {
        const activeIndex = prevOrder.indexOf(active.id);
        const overIndex = prevOrder.indexOf(over.id);
        const newOrder = arrayMove(prevOrder, activeIndex, overIndex);
        updateTopOrder(newOrder);
        return newOrder;
      });
      setActiveId(null);
    }
  };

  const updateTopOrder = async (list) => {
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

  const updateDetailOrder = async (list) => {
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

  useEffect(() => {
    console.log(visibility);
  }, [visibility]);

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

          <div className="resume-menu-container">
            <DndContext
              collisionDetection={closestCenter}
              onDragStart={({ active }) => {
                setActiveId(active.id);
              }}
              onDragEnd={handleTopLevelDragEnd}
            >
              <SortableContext
                items={topOrder}
                strategy={verticalListSortingStrategy}
              >
                <ul className="resume-menu">
                  <li>
                    <div
                      className="dnd-box"
                      onClick={() => toggleSection("profile")}
                    >
                      <i
                        className={
                          openSections["profile"]
                            ? "xi-angle-down-min"
                            : "xi-angle-right-min"
                        }
                      />

                      <p
                        style={{
                          color: visibility["profile"]?.main || "#979797",
                        }}
                      >
                        프로필
                      </p>
                      <div
                        className="dnd-box__drag drag-sidebar"
                        onClick={(e) => {
                          toggleVisibility("profile", "main"),
                            e.stopPropagation();
                        }}
                      >
                        <i
                          className={
                            visibility["profile"]?.main
                              ? "xi-eye-o"
                              : "xi-eye-off-o"
                          }
                        />
                      </div>
                    </div>
                    {openSections["profile"] &&
                      (visibility["profile"]?.main ? (
                        <ul className="dnd-box">
                          <li className="resume-child">
                            <i className={sectionsConfig["profile"].icon} />
                            <p>자기소개</p>
                          </li>
                          <div
                            className="dnd-box__drag drag-sidebar"
                            onClick={(e) => {
                              toggleVisibility("profile", "main"),
                                e.stopPropagation();
                            }}
                          >
                            <i className="xi-eye-o" />
                          </div>
                        </ul>
                      ) : (
                        <li className="resume-child">
                          <i
                            className="xi-eye-off-o"
                            onClick={(e) => toggleVisibility("profile", "main")}
                          />

                          <p
                            style={{
                              color: "#979797",
                            }}
                          >
                            자기소개
                          </p>
                        </li>
                      ))}
                  </li>
                  {topOrder.map((category) => {
                    const menu = res?.list?.find(
                      (item) => item.category === category
                    );
                    const isVisible = visibility[category]?.main;
                    return (
                      <SortableItem
                        key={menu?.category}
                        id={menu?.category}
                        type="sidebar"
                        plus={
                          openSections[menu?.category] && (
                            <DndContext
                              collisionDetection={closestCenter}
                              onDragStart={({ active }) => {
                                setActiveSubId(active.id);
                              }}
                              onDragEnd={(event) =>
                                handleNestedDragEnd(event, menu?.category)
                              }
                            >
                              <SortableContext
                                items={orders[menu?.category]}
                                strategy={verticalListSortingStrategy}
                              >
                                <ul>
                                  {orders[menu?.category]?.map((id) => {
                                    const subMenuItem = menu.sub.find(
                                      (item) => item.id === id
                                    );
                                    const isMain =
                                      visibility?.[menu?.category]?.main;
                                    console.log("isMain", isMain);
                                    const isVisible =
                                      visibility[menu?.category]?.[id];
                                    return visibility[menu?.category]?.main ? (
                                      isVisible ? (
                                        <SortableItem
                                          key={id}
                                          id={id}
                                          type="sidebar"
                                        >
                                          <li className="resume-child">
                                            <i className={menu?.icon} />
                                            <p>{subMenuItem?.title}</p>
                                          </li>
                                          <div
                                            className="dnd-box__drag drag-sidebar last"
                                            onClick={() =>
                                              toggleVisibility(
                                                menu?.category,
                                                id
                                              )
                                            }
                                          >
                                            <i className="xi-eye-o" />
                                          </div>
                                        </SortableItem>
                                      ) : (
                                        <li className="resume-child" key={id}>
                                          <i
                                            className="xi-eye-off-o"
                                            onClick={() =>
                                              toggleVisibility(
                                                menu?.category,
                                                id
                                              )
                                            }
                                          />
                                          <p style={{ color: "#979797" }}>
                                            {subMenuItem?.title}
                                          </p>
                                        </li>
                                      )
                                    ) : (
                                      <li className="resume-child" key={id}>
                                        <i
                                          className="xi-eye-off-o"
                                          onClick={() => {
                                            toggleVisibility(
                                              menu?.category,
                                              "main"
                                            );
                                            toggleVisibility(
                                              menu?.category,
                                              id
                                            );
                                          }}
                                        />
                                        <p style={{ color: "#979797" }}>
                                          {subMenuItem?.title}
                                        </p>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </SortableContext>
                              <DragOverlay>
                                {activeSubId ? (
                                  <SortableItem
                                    key={activeSubId}
                                    id={activeSubId}
                                  />
                                ) : null}
                              </DragOverlay>
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
                            <p style={{ color: isVisible || "#979797" }}>
                              {menu?.title}
                            </p>
                            <div
                              className="dnd-box__drag drag-sidebar last"
                              onClick={(e) => {
                                toggleVisibilityMain(menu?.category, "main");
                                e.stopPropagation();
                              }}
                            >
                              <i
                                className={
                                  isVisible ? "xi-eye-o" : "xi-eye-off-o"
                                }
                              />
                            </div>
                          </div>
                        </li>
                      </SortableItem>
                    );
                  })}
                </ul>
              </SortableContext>
              <DragOverlay>
                {activeId ? (
                  <SortableItem key={activeId} id={activeId} />
                ) : null}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
