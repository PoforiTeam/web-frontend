import React from 'react';
import EditForm from '../../common/EditForm';
import Tips from '../../common/Tips';
import CustomInput from '../../common/CustomInput';

const IntroduceEditForm = ({ formik, textareaRef, handleCancel }) => {
  const fields = [
    {
      tag: 'textarea',
      id: 'introduce_text',
      name: 'introduce_text',
      label: '자기소개 내용',
      type: 'text',
      required: true,
      onChange: formik.handleChange,
      values: formik.values.introduce_text,
      textareaRef: textareaRef,
    },
  ];

  return (
    <EditForm
      title={'자기소개'}
      onSubmit={formik.handleSubmit}
      handleCancel={handleCancel}
    >
      <Tips
        title="자기소개는 내가 어떤 경력/경험을 가졌고 관심사가 무엇인지 위주의 짧은
        글이에요."
        list={[
          '면접관이 이력서를 더 읽고 싶도록 장점을 강조해서 작성해보세요.',
          '본인의 강점을 나타내는 키워드와 함께 이를 뒷받침할 수 있는 내용을 적으면 더 설득력이 있습니다.',
          '경력인 경우에는, 업무 성과를 강조하는 것을 추천합니다.',
        ]}
      />
      <CustomInput fields={fields} />
    </EditForm>
  );
};

export default IntroduceEditForm;
