import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
// import { ErrorBoundary } from 'react-error-boundary';

import App from './App';
import './global.css';
// import NotFoundPage from './pages/misc/Error';

const container = document.getElementById('root');
const root = createRoot(container);

// Create a client
const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
