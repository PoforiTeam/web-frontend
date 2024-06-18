import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import LoginModal from "./components/modals/LoginModal";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <AuthProvider>
      <div>
        <RouterProvider router={router(openLoginModal)} />
        {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
      </div>
    </AuthProvider>
  );
};

export default App;
