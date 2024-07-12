import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "../../assets/styles/layout.scss";

const Layout = ({ children, openLoginModal, openAccountModal }) => (
  <div className="layout">
    <Header onLoginClick={openLoginModal} onAccountClick={openAccountModal} />
    <div className="content">
      {/* <Sidebar /> */}
      <MainContent>{children}</MainContent>
    </div>
  </div>
);

export default Layout;
