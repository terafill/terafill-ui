import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppHome, { ItemPanel, ItemPanelIndex } from './pages/AppHome';
import FaqPage from './pages/FaqPage';
import HelpSupport from './pages/HelpSupport';
import Import from './pages/Import';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import ProductsPage from './pages/ProductsPage';
import Settings from './pages/settings/Settings';
import SettingsDeviceManagement from './pages/settings/SettingsDeviceManagement';
import SettingsPersonalInfo from './pages/settings/SettingsPersonalInfo';
import SettingsSecurity from './pages/settings/SettingsSecurity';
import SettingsSharing, {
  SettingsSharingByUser,
  SettingsSharingByPassword,
} from './pages/settings/SettingsSharing';
import SignUpPage, { CreateAccountForm, EmailConfirmationForm } from './pages/SignUpPage';
import WhitepaperPage from './pages/WhitepaperPage';

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
        element: <SettingsPersonalInfo />,
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
    path: '/settings',
    element: <Settings />,
    children: [
      {
        index: true,
        element: <SettingsPersonalInfo />,
      },
      {
        path: 'security',
        element: <SettingsSecurity />,
      },
      {
        path: 'sharing',
        element: <SettingsSharing />,
        children: [
          {
            index: true,
            path: 'by-password',
            element: <SettingsSharingByPassword />,
          },
          {
            path: 'by-user',
            element: <SettingsSharingByUser />,
          },
        ],
      },
      {
        path: 'device-management',
        element: <SettingsDeviceManagement />,
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
