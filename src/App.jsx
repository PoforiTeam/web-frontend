import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./routes/Main";
import Resume from "./routes/Resume";
import KakaoRedirection from "./utils/socialLogin/KakaoRedirection";

const router = createBrowserRouter([
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

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
