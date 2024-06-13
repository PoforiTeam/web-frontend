import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./routes/Main";
import Resume from "./routes/Resume";
import KakaoRedirection from "./utils/socialLogin/kakaoRedirection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Main /> },
      { path: "resume", element: <Resume /> },
      { path: "auth/kakao", element: <KakaoRedirection /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
