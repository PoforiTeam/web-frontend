const ResumeBox = ({ index, handleEdit, handleDelete, children }) => {
  return (
    <div className="resume-box" key={index}>
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
