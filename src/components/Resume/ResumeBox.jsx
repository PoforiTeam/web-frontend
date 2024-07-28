import { useEffect, useState } from "react";

const ResumeBox = ({
  index,
  onDragOver,
  handleEdit,
  handleDelete,
  children,
}) => {
  return (
    <div className="resume-box" key={index}>
      {onDragOver && (
        <div className="resume-box__drag">
          <img src="../src/assets/img/draggabledots.png" />
        </div>
      )}
      <div className="resume-box__icon">
        <div onClick={handleEdit}>
          <i className="xi-border-color" />
        </div>
        <div onClick={handleDelete}>
          <i className="xi-trash-o" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default ResumeBox;
