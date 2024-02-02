import { createBrowserRouter } from "react-router-dom";
import SignIn from "../../components/SignIn/SingIn";
import SignUp from "../../components/SignUp/SignUp";
import { Layout } from "../../layout/layout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // {
      //   path: "/",
      //   element: <SignIn />, // faire une homepage plutôt qui amène sur sign-in hairdresser ou customer ?
      // },
      {
        path: "/sign-in/:userType",
        element: <SignIn />,
      },
      {
        path: "/sign-up/:userType",
        element: <SignUp />,
      }
    ],
  },
]);
