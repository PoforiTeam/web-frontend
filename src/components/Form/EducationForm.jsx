import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";
import { SortableItem } from "../DnD/SortableItem";
import ResumeSection from "../Resume/ResumeSection";
import EducationFormItem from "./EducationFormItem";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

const EducationForm = ({ isUpdate, setUpdate }) => {
  const { id } = useParams();
  const [educations, setEducations] = useState([]);
  const [order, setOrder] = useState([]);
  const [editIndices, setEditIndices] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);
  const [activeSubId, setActiveSubId] = useState(null);

  const getEducationDetail = async () => {
    try {
      const { data } = await resumeApi.education.detail(id);
      if (data.response.result.length > 0) {
        const sortedEducations = data.response.result.sort(
          (a, b) => a.education_sub_order - b.education_sub_order
        );
        setEducations(sortedEducations);
        setOrder(sortedEducations.map((edu) => edu.education_id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (index) => {
    setEditIndices((prev) => [...prev, index]);
  };

  const handleCancel = (index) => {
    setEditIndices((prev) => prev.filter((i) => i !== index));
  };

  const handleNewForm = () => {
    setIsNewForm(true);
  };

  const handleCancelNewForm = () => {
    setIsNewForm(false);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setOrder((prevOrder) => {
        const activeIndex = prevOrder.indexOf(active.id);
        const overIndex = prevOrder.indexOf(over.id);
        const newOrder = arrayMove(prevOrder, activeIndex, overIndex);
        updateEducationOrder(newOrder);
        return newOrder;
      });
      setActiveSubId(null);
    }
  };

  const updateEducationOrder = (newOrder) => {
    const updatedEducations = newOrder
      .map((id, index) => {
        console.log(id);
        const education = educations.find((edu) => edu.education_id === id);
        if (education) {
          return {
            ...education,
            education_sub_order: index + 1,
          };
        }
        return null;
      })
      .filter(Boolean); // filter out null values
    const detailOrders = updatedEducations.map((edu) => ({
      item_id: edu.education_id,
      item_order: edu.education_sub_order,
    }));

    setEducations(updatedEducations);
    updateDetailOrder({
      resume_category: "education",
      detail_orders: detailOrders,
    });
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
    getEducationDetail();
  }, [id]);

  useEffect(() => {
    isUpdate && getEducationDetail();
  }, [isUpdate]);

  return (
    <>
      <ResumeSection title="교육" onClick={handleNewForm} />
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={({ active }) => {
          setActiveSubId(active.id);
        }}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          {isNewForm && (
            <EducationFormItem
              id={id}
              education={{
                resume_id: Number(id),
                education_category: "",
                education_name: "",
                major: "",
                education_status: "",
                enter_date: "",
                graduate_date: "",
                detail: "",
              }}
              isEdit={true}
              handleEdit={handleNewForm}
              handleCancel={handleCancelNewForm}
              getEducationDetail={getEducationDetail}
            />
          )}
          {order.map((educationId, index) => {
            const education = educations.find(
              (edu) => edu.education_id === educationId
            );
            return (
              <SortableItem key={educationId} id={educationId} type="form">
                {education && (
                  <EducationFormItem
                    key={education.education_id}
                    id={id}
                    index={index}
                    education={education}
                    isEdit={editIndices.includes(index)}
                    handleEdit={() => handleEdit(index)}
                    handleCancel={() => handleCancel(index)}
                    getEducationDetail={getEducationDetail}
                  />
                )}
              </SortableItem>
            );
          })}
        </SortableContext>
        <DragOverlay>
          {activeSubId ? (
            <SortableItem key={activeSubId} id={activeSubId} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default EducationForm;
