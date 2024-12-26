import React from 'react';

const EditForm = ({ title, children, onSubmit, handleCancel }) => {
  return (
    <form className="resume-form" onSubmit={onSubmit}>
      <h2>{title}</h2>
      {children}
      <div className="button-group">
        <button type="button" className="cancel-button" onClick={handleCancel}>
          취소
        </button>
        <button type="submit" className="submit-button">
          저장
        </button>
      </div>
    </form>
  );
};

export default EditForm;
