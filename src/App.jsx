import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Feed from "./components/Feed.jsx";
import Connections from "./components/Connections.jsx";
import Requests from "./components/Requests.jsx";
import Premium from "./components/Premium.jsx";
import Chat from "./components/Chat.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <Feed />},
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile /> },
      { path: "/connections", element: <Connections /> },
      { path: "/requests", element: <Requests /> },
      { path: "/premium", element: <Premium /> },
      { path: "/chat/:targetUserId", element: <Chat />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
