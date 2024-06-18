const Modal = ({ children, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <button onClick={onClose} style={{ float: "right" }}>
        X
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
