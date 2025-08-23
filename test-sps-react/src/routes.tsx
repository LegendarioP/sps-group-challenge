import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Users from "./pages/Users.tsx";
import UserEdit, { userLoader } from "./pages/UserEdit.tsx";
import SignIn from "./pages/SignIn.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/:userId",
    element: <UserEdit />,
    loader: userLoader,
  },
]);

export default router;