import React, { useState } from "react";
import AccountEditModal from "../../components/modals/AccountEditModal";

const Settings = () => {
  const [isAccountEditModalOpen, setAccountEditModalOpen] = useState(false);

  return (
    <>
      <h1>설정</h1>
      <button onClick={() => setAccountEditModalOpen(true)}>계정 수정</button>
      {isAccountEditModalOpen && (
        <AccountEditModal onClose={() => setAccountEditModalOpen(false)} />
      )}
    </>
  );
};

export default Settings;
