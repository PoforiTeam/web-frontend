import "./Modal.scss";
const Modal = ({ children, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <div className="modal-close">
        <button onClick={onClose}>
          <i className="xi-close" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
