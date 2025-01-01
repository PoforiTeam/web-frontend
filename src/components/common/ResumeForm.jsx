import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ResumeSection from '@/components/Resume/ResumeSection';
import ResumeFormItem from './ResumeFormItem';
import ResumeEditForm from './ResumeEditForm';
import useCustomFormik from '@/hooks/useCustomFormik';
import useCategoryDetail from '@/hooks/useCategoryDetail';
import { swapSubOrder } from '../../utils/swapSubOrder';

const ResumeForm = ({
  title,
  category,
  initialValues,
  renderFields,
  FormItem,
  customQuery,
}) => {
  const { id } = useParams();
  const [isNewForm, setIsNewForm] = useState(false);
  const {
    createItem,
    itemList: originalItemList,
    updateOrder,
  } = useCategoryDetail({
    id,
    category,
    customQuery,
  });
  const [itemList, setItemList] = useState(originalItemList || []);
  const resumeId = Number(id);

  const formik = useCustomFormik({
    initialValues: {
      ...initialValues,
      resume_id: resumeId,
    },
    onSubmitCallback: (values) => {
      createItem.mutate(values);
      formik.resetForm();
      setIsNewForm(false);
    },
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = itemList.findIndex(
        (item) => item[`${category}_id`] === active.id
      );
      const newIndex = itemList.findIndex(
        (item) => item[`${category}_id`] === over.id
      );

      const newList = arrayMove(itemList, oldIndex, newIndex);
      setItemList(newList);

      // 서버에 정렬된 데이터 저장하려면 별도 API 호출 필요
      const updatedList = swapSubOrder(itemList, active.id, newIndex, category);

      const detailOrders = updatedList.map((item) => ({
        item_id: item[`${category}_id`],
        item_order: item[`${category}_sub_order`],
      }));

      updateOrder.mutate({
        resume_category: category,
        detail_orders: detailOrders,
      });
    }
  };

  useEffect(() => {
    setItemList(originalItemList);
  }, [originalItemList]);

  return (
    <>
      <ResumeSection title={title} onClick={() => setIsNewForm(true)} />

      {isNewForm && (
        <ResumeEditForm
          formik={formik}
          setIsEdit={setIsNewForm}
          renderFields={renderFields}
        />
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {itemList && (
          <SortableContext
            items={itemList.map((item) => item[`${category}_id`])}
            strategy={verticalListSortingStrategy}
          >
            {itemList.map((item) => (
              <ResumeFormItem
                key={item[`${category}_id`]}
                item={item}
                category={category}
                FormItem={FormItem}
                initialValues={initialValues}
                renderFields={renderFields}
              />
            ))}
          </SortableContext>
        )}
      </DndContext>
    </>
  );
};

export default ResumeForm;
