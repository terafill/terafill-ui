import { Buffer } from 'buffer';
import process from 'process';

import React, { useEffect } from 'react';

global.Buffer = Buffer;
global.process = process;

// Landing Page
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import AppHome, { ItemPanel, ItemPanelIndex } from './pages/AppHome';
import FaqPage from './pages/FaqPage';
import HelpSupport from './pages/HelpSupport';
import Import from './pages/Import';
import LandingPage from './pages/LandingPage';

// Login and Signup
import LoginPage from './pages/LoginPage';
import PricingPage from './pages/PricingPage';
import ProductsPage from './pages/ProductsPage';

// App Home

// Settings
import Settings from './pages/settings/Settings';
import SettingsDeviceManagement from './pages/settings/SettingsDeviceManagement';
import SettingsPersonalInfo from './pages/settings/SettingsPersonalInfo';
import SettingsSecurity from './pages/settings/SettingsSecurity';
import SettingsSharing, {
  SettingsSharingByUser,
  SettingsSharingByPassword,
} from './pages/settings/SettingsSharing';
import SignUpPage, { CreateAccountForm, EmailConfirmationForm, RecoveryKitForm } from './pages/SignUpPage';
import WhitepaperPage from './pages/WhitepaperPage';

// Others

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
  // {
  //   path: "/app-home",
  //   element: <AppHome />,
  //   children: [
  //     {
  //       path: ":id",
  //       element: <ItemPanel/>,
  //     },
  //     {
  //       index: true,
  //       element: <ItemPanelIndex />
  //     },
  //   ],

  // },
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
      {
        path: 'recovery-kit',
        element: <RecoveryKitForm />,
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
  //     case "/settings-device-management":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/app-home":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/email-confirmation":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/import":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/settings-sharing-by-user":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/settings-sharing-by-password":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/settings-security":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/settings-personal-info":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/create-password":
  //       title = "";
  //       metaDescription = "";
  //       break;
  //     case "/signup-page":
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

  return (
    <RouterProvider router={router} />
    // <Routes>
    //   <Route path="/" element={<LandingPage />} />

    //   <Route path="/recovery-kit" element={<RecoveryKit />} />

    //   <Route path="/help-and-support" element={<HelpSupport />} />

    //   <Route
    //     path="/settings-device-management"
    //     element={<SettingsDeviceManagement />}
    //   />

    //   <Route path="/app-home" element={<AppHome />} >
    //     <Route
    //       path=":id"
    //       element={<PasswordPanel/>}
    //       loader={passwordDataLoader}
    //     />
    //   </Route>

    //   <Route path="/email-confirmation" element={<EmailConfirmation />} />

    //   <Route path="/import" element={<Import />} />

    //   <Route
    //     path="/settings-sharing-by-user"
    //     element={<SettingsSharingByUser />}
    //   />

    //   <Route
    //     path="/settings-sharing-by-password"
    //     element={<SettingsSharingByPassword />}
    //   />

    //   <Route path="/settings-security" element={<SettingsSecurity />} />

    //   <Route path="/settings-personal-info" element={<SettingsPersonalInfo />} />

    //   <Route path="/create-password" element={<CreatePassword />} />

    //   <Route path="/signup-page" element={<SignUpPage />} />
    // </Routes>
  );
}
export default App;
