import React from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import GlobalError from './GlobalError';
// Inner App
import AppHome from './pages/app/Home/index';
import ItemPanel from './pages/app/Home/ItemPanel';
import ItemPanelIndex from './pages/app/Home/ItemPanelIndex';
// Login
import LoginPage from './pages/auth/Login';
//Signup
import CreateAccountForm from './pages/auth/Signup/CreateAccountForm';
import EmailConfirmationForm from './pages/auth/Signup/EmailConfirmationForm';
import SignUpPage from './pages/auth/Signup/index';
//Landing
import LandingPage from './pages/marketing/Landing/Landing';
import NotFoundPage from './pages/misc/Error';

const ErrorBoundaryLayout = () => (
    <ErrorBoundary FallbackComponent={GlobalError}>
        <Outlet />
    </ErrorBoundary>
);

const router = createBrowserRouter([
    {
        element: <ErrorBoundaryLayout />,
        children: [
            {
                path: '/',
                element: <LandingPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: '/404',
                element: <NotFoundPage />,
            },
            {
                path: '/app',
                children: [
                    {
                        path: 'home',
                        element: <AppHome />,
                        children: [
                            {
                                path: ':id',
                                element: <ItemPanel />,
                            },
                            {
                                index: true,
                                element: <ItemPanelIndex />,
                            },
                        ],
                    },
                ],
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/signup',
                element: <SignUpPage />,
                children: [
                    {
                        index: true,
                        element: <CreateAccountForm />,
                    },
                    {
                        path: 'email-confirmation',
                        element: <EmailConfirmationForm />,
                    },
                ],
            },
            {
                path: '/*',
                element: <NotFoundPage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}
export default App;
