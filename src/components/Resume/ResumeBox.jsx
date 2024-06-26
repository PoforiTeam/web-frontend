import { useEffect, useState } from "react";

const ResumeBox = ({
  index,
  onDragOver,
  onDragStart,
  onDragEnd,
  onDrop,
  handleEdit,
  handleDelete,
  children,
}) => {
  return (
    <div className="resume-box" key={index}>
      {onDragOver && (
        <div
          className="resume-box__drag"
          data-position={index}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDrop={onDrop}
          onDragOver={onDragOver}
          draggable
        >
          <i className="xi-drag-vertical" />
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
