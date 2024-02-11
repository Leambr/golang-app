import { createBrowserRouter } from 'react-router-dom';
import SignIn from '../../components/SignIn/SingIn';
import SignUp from '../../components/SignUp/SignUp';
import { Layout } from '../../layout/layout';
import { CustomerHomePage } from '../../pages/CustomerHomePage/CustomerHomePage';
import { HaidresserHomePage } from '../../pages/HaidresserHomePage/HaidresserHomePage';
import { HairsalonPage } from '../../pages/HairsalonPage/HairsalonPage';
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
            {
                path: '/home-customer',
                element: <CustomerHomePage />,
            },
            {
                path: '/home-hairdresser',
                element: <HaidresserHomePage />,
            },
            {
                path: '/hairsalon',
                element: <HairsalonPage />,
            },
        ],
    },
]);
