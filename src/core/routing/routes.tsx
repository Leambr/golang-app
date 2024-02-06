import { createBrowserRouter } from 'react-router-dom';
import SignIn from '../../components/SignIn/SingIn';
import SignUp from '../../components/SignUp/SignUp';
import { Layout } from '../../layout/layout';
import LandingPage from '../../pages/LandingPage/LandingPage';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <LandingPage />,
            },
            {
                path: '/sign-in/:userType',
                element: <SignIn />,
            },
            {
                path: '/sign-up/:userType',
                element: <SignUp />,
            },
        ],
    },
]);
