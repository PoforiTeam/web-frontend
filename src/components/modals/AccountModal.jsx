import "./Modal.scss";
import Modal from "./Modal";
import { useAuthContext } from "../../context/AuthContext";

const AccountModal = ({ onClose }) => {
  const { auth } = useAuthContext();
  return (
    <Modal onClose={onClose} title="계정" maxWidth="624px" maxHeight="405px">
      <div className="account-modal">
        <ul>
          <li>
            <h3>이름 *</h3>
            <div>
              <input type="text" value={auth?.user_name} />
              <button className="submit-button">저장</button>
            </div>
          </li>
          <li>
            <h3>이메일</h3>
            <p>{auth?.email || "-"}</p>
          </li>
        </ul>
        <div className="text-button">
          <button>로그아웃</button>
        </div>
        <div className="text-button">
          <button>계정 삭제</button>
        </div>
      </div>
    </Modal>
  );
};

export default AccountModal;
