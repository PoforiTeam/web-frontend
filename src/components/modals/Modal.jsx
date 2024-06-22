import "./Modal.scss";
const Modal = ({ children, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <div className="modal-close">
        <button onClick={onClose}>✖</button>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
