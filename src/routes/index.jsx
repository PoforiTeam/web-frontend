import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Main from "@/pages/Main";
import Resume from "@/pages/Resume";
import KakaoRedirection from "@/utils/socialLogin/KakaoRedirection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Main /> },
      { path: "resume", element: <Resume /> },
      { path: "oauth/kakao", element: <KakaoRedirection /> },
    ],
  },
]);
