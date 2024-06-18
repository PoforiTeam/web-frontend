import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import LoginModal from "./components/modals/LoginModal";

const App = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  return (
    <div>
      <RouterProvider router={router(openLoginModal)} />
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </div>
  );
};

export default App;
