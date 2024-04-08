import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Error from "../pages/Error";
import Contacts from "../pages/Contacts";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
    path: "/",
    children: [
      { element: <Contacts />, errorElement: <Error />, path: "/contacts" },
    ],
  },
]);

export default router;
