const AddButton = ({ section }) => {
  return (
    <button className="add-btn">
      <i className="xi-plus-min" /> {section} 추가
    </button>
  );
};

export default AddButton;
