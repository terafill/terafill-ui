import React from 'react';

// Inner App
import { ErrorBoundary } from 'react-error-boundary';
import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import AppHome from 'ui/pages/app/Home/index.tsx';
import ItemPanel from 'ui/pages/app/Home/ItemPanel';
import ItemPanelIndex from 'ui/pages/app/Home/ItemPanelIndex';
// Login
import LoginPage from 'ui/pages/auth/Login';
import NotFoundPage from 'ui/pages/misc/Error';

import GlobalError from './GlobalError';

const ErrorBoundaryLayout = () => (
    <ErrorBoundary FallbackComponent={GlobalError}>
        <Outlet />
    </ErrorBoundary>
);

const router = createHashRouter([
    {
        element: <ErrorBoundaryLayout />,
        children: [
            {
                path: '/404',
                element: <NotFoundPage />,
            },
            {
                path: '/app',
                children: [
                    {
                        path: 'home',
                        element: <AppHome CLIENT_ENV='PLUGIN' />,
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
                path: '/',
                element: <LoginPage CLIENT_ENV='PLUGIN' />,
                index: true,
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
