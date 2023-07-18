import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppHome, { ItemPanel, ItemPanelIndex } from './pages/app/AppHome';
import HelpSupport from './pages/app/HelpSupport';
import Import from './pages/app/Import';
import PersonalInfo from './pages/app/PersonalInfo';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage, { CreateAccountForm, EmailConfirmationForm } from './pages/auth/SignUpPage';
import FaqPage from './pages/marketing/FaqPage';
import LandingPage from './pages/marketing/LandingPage';
import PricingPage from './pages/marketing/PricingPage';
import ProductsPage from './pages/marketing/ProductsPage';
import WhitepaperPage from './pages/marketing/WhitepaperPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/app',
    children: [
      {
        // index: true,
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
      {
        path: 'profile',
        element: <PersonalInfo />,
      },
    ],
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/pricing',
    element: <PricingPage />,
  },
  {
    path: '/whitepaper',
    element: <WhitepaperPage />,
  },
  {
    path: '/faq',
    element: <FaqPage />,
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
    path: '/import',
    element: <Import />,
  },
  {
    path: '/help-and-support',
    element: <HelpSupport />,
  },
]);

function App() {
  // const action = useNavigationType();
  // const location = useLocation();
  // const pathname = location.pathname;

  // useEffect(() => {
  //   if (action !== "POP") {
  //     window.scrollTo(0, 0);
  //   }
  // }, [action, pathname]);

  // useEffect(() => {
  //   let title = "";
  //   let metaDescription = "";

  //   switch (pathname) {
  //     case "/":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/recovery-kit":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/help-and-support":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //   }

  //   if (title) {
  //     document.title = title;
  //   }

  //   if (metaDescription) {
  //     const metaDescriptionTag = document.querySelector(
  //       'head > meta[name="description"]'
  //     );
  //     if (metaDescriptionTag) {
  //       metaDescriptionTag.content = metaDescription;
  //     }
  //   }
  // }, [pathname]);

  return <RouterProvider router={router} />;
}
export default App;
