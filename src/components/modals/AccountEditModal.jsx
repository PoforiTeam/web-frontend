import Modal from "./Modal";

const AccountEditModal = ({ onClose }) => (
  <Modal onClose={onClose}>
    <h2>계정</h2>
    <form>
      <label>이름</label>
      <input type="text" />
      <label>이메일</label>
      <input type="email" disabled value="minhee@gmail.com" />
      <button type="submit">저장</button>
    </form>
  </Modal>
);

export default AccountEditModal;
