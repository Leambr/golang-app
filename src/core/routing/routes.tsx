import React from "react";
import { createBrowserRouter } from "react-router-dom";
import SignUp from "../../components/SignUp/SignUp";
import SignIn from "../../components/SignIn/SingIn";
import { Layout } from "../../layout/layout";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, 
        children: [
            {
                path: "/",
                element: <SignIn />
            },
            {
                path: "/sign-up",
                element: <SignUp />
            }
        ]
    }
])