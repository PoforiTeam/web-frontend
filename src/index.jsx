import { GoogleOAuthProvider } from "@react-oauth/google";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/application.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);
