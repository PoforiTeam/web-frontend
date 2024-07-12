import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import LoginModal from "./components/modals/LoginModal";
import AccountModal from "./components/modals/AccountModal";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);
  const openAccountModal = () => setAccountModalOpen(true);
  const closeAccountModal = () => setAccountModalOpen(false);

  return (
    <AuthProvider>
      <div>
        <RouterProvider router={router(openLoginModal, openAccountModal)} />
        {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
        {isAccountModalOpen && <AccountModal onClose={closeAccountModal} />}
      </div>
    </AuthProvider>
  );
};

export default App;
