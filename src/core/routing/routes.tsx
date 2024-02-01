import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "../../components/Customer/SignUp/SignUp";
import SignIn from "../../components/Customer/SignIn/SingIn";
import SignUpHaidresser from "../../components/Hairdresser/SignUpHaidresser/SignUpHaidresser";
import { Layout } from "../../layout/layout";
import SignInHaidresser from "../../components/Hairdresser/SignInHaidresser/SignInHaidresser";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/sign-up-haidresser",
        element: <SignUpHaidresser />,
      },
      {
        path: "/sign-in-haidresser",
        element: <SignInHaidresser />,
      },
    ],
  },
]);
