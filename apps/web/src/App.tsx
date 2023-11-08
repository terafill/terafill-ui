import React from 'react';

// Inner App
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import AppHome from 'ui/pages/app/Home/index.tsx';
import ItemPanel from 'ui/pages/app/Home/ItemPanel';
import ItemPanelIndex from 'ui/pages/app/Home/ItemPanelIndex';
import ItemsView from 'ui/pages/app/Home/ItemsView';
// Login
import LoginPage from 'ui/pages/auth/Login';
//Signup
import CreateAccountForm from 'ui/pages/auth/Signup/CreateAccountForm';
import EmailConfirmationForm from 'ui/pages/auth/Signup/EmailConfirmationForm';
import SignUpPage from 'ui/pages/auth/Signup/index';
//Landing
import LandingPage from 'ui/pages/marketing/Landing/Landing';
import NotFoundPage from 'ui/pages/misc/Error';

import GlobalError from './GlobalError';

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
                                path: 'vault/:vaultId',
                                element: <ItemsView viewType='vault' />,
                                children: [
                                    {
                                        path: 'item/:id',
                                        element: <ItemPanel />,
                                    },
                                    {
                                        index: true,
                                        element: <ItemPanelIndex />,
                                    },
                                ],
                            },
                            {
                                path: 'tag/:tagId',
                                element: <ItemsView viewType='tag' />,
                                children: [
                                    {
                                        path: 'item/:id',
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
