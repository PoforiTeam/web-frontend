import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <h1>Pofori</h1>
      <Outlet />
    </>
  );
};

export default Layout;
