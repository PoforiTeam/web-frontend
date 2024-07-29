import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";
import { SortableItem } from "../DnD/SortableItem";
import ResumeSection from "../Resume/ResumeSection";
import EducationFormItem from "./EducationFormItem";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

const EducationForm = () => {
  const { id } = useParams();
  const [educations, setEducations] = useState([]);
  const [order, setOrder] = useState([]);
  const [editIndices, setEditIndices] = useState([]);
  const [isNewForm, setIsNewForm] = useState(false);
  // const [activeId, setActiveId] = useState(null);

  const getEducationDetail = async () => {
    try {
      const { data } = await resumeApi.education.detail(id);
      if (data.response.result.length > 0) {
        setEducations(data.response.result);
        setOrder(data.response.result.map(edu => edu.education_sub_order));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = index => {
    setEditIndices(prev => [...prev, index]);
  };

  const handleCancel = index => {
    setEditIndices(prev => prev.filter(i => i !== index));
  };

  const handleNewForm = () => {
    setIsNewForm(true);
  };

  const handleCancelNewForm = () => {
    setIsNewForm(false);
  };

  useEffect(() => {
    getEducationDetail();
  }, []);

  useEffect(() => {
    console.log(order);
  }, [order]);

  // const handleDragStart = event => {
  //   setActiveId(event.active.id);
  // };
  const handleDragEnd = event => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setOrder(prevOrder => {
        const activeIndex = prevOrder.indexOf(active.id);
        const overIndex = prevOrder.indexOf(over.id);
        return arrayMove(prevOrder, activeIndex, overIndex);
      });
    }
  };

  const handleSave = () => {
    // Update the educations with the new order
    const newEducations = [...educations];
    order.forEach((subOrder, index) => {
      const education = newEducations.find(
        edu => edu.education_sub_order === subOrder
      );
      if (education) {
        education.education_sub_order = index + 1;
      }
    });
    setEducations(newEducations);
    // Add logic to send newEducations to the server
  };

  return (
    <>
      <ResumeSection title="교육" onClick={handleNewForm} />
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        // onDragStart={handleDragStart}
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
          {order.map((subOrder, index) => {
            const education = educations.find(
              edu => edu.education_sub_order === subOrder
            );
            return (
              <SortableItem key={subOrder} id={subOrder} type="form">
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
          {/* <DragOverlay>
            {activeId ? (
              <div
                style={{
                  zIndex: "100",
                  opacity: 0.5,
                }}
              ></div>
            ) : null}
          </DragOverlay> */}
        </SortableContext>
      </DndContext>
      {/* <button onClick={handleSave}>Save Changes</button> */}
    </>
  );
};

export default EducationForm;
