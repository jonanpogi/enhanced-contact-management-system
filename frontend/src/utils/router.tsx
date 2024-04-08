import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Error from "../pages/Error";
import Contacts from "../pages/Contacts";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    path: "/",
    children: [
      { element: <Contacts />, errorElement: <Error />, path: "/" },
    ],
  },
  { element: <SignIn />, errorElement: <Error />, path: "/sign-in" },
  { element: <SignUp />, errorElement: <Error />, path: "/sign-up" },
]);

export default router;
