import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import Resume from "./pages/Resume/Resume";
// import Profile from './pages/Profile';
import Settings from "./pages/Settings/Settings";

const router = openLoginModal =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout openLoginModal={openLoginModal} />,
      children: [
        { path: "", element: <Home /> },
        { path: "resume", element: <Resume /> },
        // { path: 'profile', element: <Profile /> },
        { path: "settings", element: <Settings /> },
      ],
    },
  ]);

export default router;
