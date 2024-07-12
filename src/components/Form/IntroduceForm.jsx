import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";
import AddButton from "../Resume/AddButton";
import ResumeBox from "../Resume/ResumeBox";

const IntroduceForm = () => {
  const { id } = useParams();
  const [isEdit, setEdit] = useState(false);
  const [res, setRes] = useState({});
  const textareaRef = useRef(null);

  const [initialValues, setInitialValues] = useState({
    resume_id: Number(id),
    introduce_text: "",
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: values => {
      if (Object.keys(res).length > 0) {
        updateIntroduce(values);
      } else {
        createIntroduce(values);
      }
    },
  });

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const getIntroduceDetail = async () => {
    try {
      const { data } = await resumeApi.introduce.detail(id);
      console.log(data.response);
      if (Object.keys(data.response).length > 0) {
        setRes(data.response);
        const newInitialValues = {
          resume_id: data.response.resume_id,
          introduce_id: data.response.introduce_id,
          introduce_text: data.response.introduce_text,
        };
        setInitialValues(newInitialValues);
        formik.setValues(newInitialValues);
        setEdit(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createIntroduce = async values => {
    try {
      const res = await resumeApi.introduce.create(values);
      console.log(res);
      getIntroduceDetail();
    } catch (err) {
      console.log(err);
    }
  };

  const updateIntroduce = async values => {
    try {
      const res = await resumeApi.introduce.update(values);
      console.log(res);
      getIntroduceDetail();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteIntroduce = async introduce_id => {
    try {
      const res = await resumeApi.introduce.delete(introduce_id);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    formik.resetForm({ values: initialValues });
    setEdit(false);
  };

  useEffect(() => {
    getIntroduceDetail();
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [formik.values.introduce_text]);

  return (
    <>
      {isEdit ? (
        <form className="resume-form" onSubmit={formik.handleSubmit}>
          <h2>자기소개</h2>
          <div className="tip">
            <span>🙆‍♀️</span>
            <p>
              자기소개는 내가 어떤 경력/경험을 가졌고 관심사가 무엇인지 위주의
              짧은 글이에요.
              <ul>
                <li>
                  면접관이 이력서를 더 읽고 싶도록 장점을 강조해서 작성해보세요.
                </li>
                <li>
                  본인의 강점을 나타내는 키워드와 함께 이를 뒷받침할 수 있는
                  내용을 적으면 더 설득력이 있습니다.
                </li>
                <li>경력인 경우에는, 업무 성과를 강조하는 것을 추천합니다.</li>
              </ul>
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="introduce_text">
              자기소개 내용 <em>*</em>
            </label>
            <textarea
              id="introduce_text"
              name="introduce_text"
              onChange={formik.handleChange}
              value={formik.values.introduce_text}
              ref={textareaRef}
            />
          </div>
          <div className="button-group">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              취소
            </button>
            <button type="submit" className="submit-button">
              저장
            </button>
          </div>
        </form>
      ) : formik.values.introduce_text.length > 0 ? (
        <ResumeBox handleEdit={() => setEdit(true)}>
          <div className="introduce-item">{formik.values.introduce_text}</div>
        </ResumeBox>
      ) : (
        <AddButton section="자기소개" onClick={() => setEdit(true)} />
      )}
    </>
  );
};

export default IntroduceForm;
