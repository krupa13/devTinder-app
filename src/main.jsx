import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Feed from "./components/Feed.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appstore.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Feed />},
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
    </StrictMode>
  </Provider>
);
