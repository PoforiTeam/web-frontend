import "./Modal.scss";
const Modal = ({ children, onClose, title, maxWidth, maxHeight }) => (
  <div className="modal">
    <div
      className="modal-content"
      style={{
        width: maxWidth,
        maxWidth: maxWidth,
        height: maxHeight,
        maxHeight: maxHeight,
      }}
    >
      <div className="modal-close">
        {title && <h1>{title}</h1>}
        <button onClick={onClose}>
          <i className="xi-close" />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default Modal;
