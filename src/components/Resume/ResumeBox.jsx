const ResumeBox = ({
  index,
  handleEdit,
  handleDelete,
  children,
  attributes,
  listeners,
  setNodeRef,
  style,
}) => {
  return (
    <div
      className="resume-box dnd-box"
      {...attributes}
      key={index}
      ref={setNodeRef}
      style={style}
    >
      <div className="resume-box__icon">
        <div onClick={handleEdit}>
          <i className="xi-border-color" />
        </div>
        <div onClick={handleDelete}>
          <i className="xi-trash-o" />
        </div>
      </div>
      <div {...listeners}>
        <div className="dnd-box__drag drag-form" {...attributes} {...listeners}>
          <img src="../src/assets/img/draggabledots.png" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ResumeBox;
