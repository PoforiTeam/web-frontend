import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { resumeApi } from "../../api/resumeApi";
import AddButton from "../Resume/AddButton";
import ResumeBox from "../Resume/ResumeBox";

const IntroduceForm = () => {
  const { id } = useParams();
  const [isEdit, setEdit] = useState(false);
  const [res, setRes] = useState({});

  const [initialValues, setInitialValues] = useState({
    resume_id: Number(id),
    introduce_text: "",
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));

      if (Object.keys(res).length > 0) {
        updateIntroduce(values);
      } else {
        createIntroduce(values);
      }
    },
  });
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
  return (
    <>
      {isEdit ? (
        <form className="resume-form" onSubmit={formik.handleSubmit}>
          <h2>자기소개</h2>
          <div className="tip">
            <p>
              🙆‍♀️&emsp;1) 어떤 경력/경험을 가졌고 2) 관심사(일과 무관한 취미X,
              일적인 관심사)가 무엇인지 위주의 짧은 글
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="introduce_text">자기소개 내용</label>
            <textarea
              id="introduce_text"
              name="introduce_text"
              maxLength="500"
              onChange={formik.handleChange}
              value={formik.values.introduce_text}
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
          <div className="introduce-edit">{formik.values.introduce_text}</div>
        </ResumeBox>
      ) : (
        <AddButton section="자기소개" onClick={() => setEdit(true)} />
      )}
    </>
  );
};

export default IntroduceForm;
