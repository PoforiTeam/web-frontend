import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import "../../assets/styles/layout.scss";

const Layout = ({ children, openLoginModal }) => (
  <div className="layout">
    <Header onLoginClick={openLoginModal} />
    <div className="content">
      {/* <Sidebar /> */}
      <MainContent>{children}</MainContent>
    </div>
  </div>
);

export default Layout;
