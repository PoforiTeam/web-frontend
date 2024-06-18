import Modal from "./Modal";

const LoginModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <h2>POFORI</h2>
    <button>Google로 로그인</button>
    <button>네이버로 로그인</button>
    <button>카카오로 로그인</button>
  </Modal>
);

export default LoginModal;
