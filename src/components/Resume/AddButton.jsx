const AddButton = ({ section, onClick }) => {
  return (
    <button className="add-btn" onClick={onClick}>
      <i className="xi-plus-min" /> {section} 추가
    </button>
  );
};

export default AddButton;
