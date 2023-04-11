import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";



// Landing Page
import LandingPage from "./pages/LandingPage";
import ProductsPage from "./pages/ProductsPage";
import PricingPage from "./pages/PricingPage";
import WhitepaperPage from "./pages/WhitepaperPage";
import FaqPage from "./pages/FaqPage";

// Login and Signup
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { CreateAccountForm, EmailConfirmationForm, CreatePasswordForm, RecoveryKitForm } from "./pages/SignUpPage";

// App Home
import AppHome, { PasswordPanel, PasswordPanelIndex, passwordDataLoader } from "./pages/AppHome";

// Settings
import Settings from './pages/settings/Settings';
import SettingsPersonalInfo from "./pages/settings/SettingsPersonalInfo";
import SettingsDeviceManagement from "./pages/settings/SettingsDeviceManagement";
import SettingsSecurity from "./pages/settings/SettingsSecurity";
import SettingsSharing, { SettingsSharingByUser, SettingsSharingByPassword } from "./pages/settings/SettingsSharing";

// Others
import Import from "./pages/Import";
import HelpSupport from "./pages/HelpSupport";



const router = createBrowserRouter([
  {
    path: "/",
    element:  <LandingPage />,
  },
  {
    path: "/app-home",
    element: <AppHome />,
    children: [
      {
        path: ":id",
        element: <PasswordPanel/>,
        loader: passwordDataLoader,
      },
      {
        index: true,
        element: <PasswordPanelIndex />
      },
    ],

  },
  {
    path: "/products",
    element: <ProductsPage />
  },
  {
    path: "/pricing",
    element: <PricingPage />
  },
  {
    path: "/whitepaper",
    element: <WhitepaperPage />
  },
  {
    path: "/faq",
    element: <FaqPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    children: [
      {
        index: true,
        element: <CreateAccountForm />
      },
      {
        path: "email-confirmation",
        element: <EmailConfirmationForm />
      },
      {
        path: "create-password",
        element: <CreatePasswordForm />
      },
      {
        path: "recovery-kit",
        element: <RecoveryKitForm />
      },
    ]
  },
  {
    path: "/settings",
    element: <Settings />,
    children: [
      {
        index: true,
        element: <SettingsPersonalInfo />
      },
      {
        path: "security",
        element: <SettingsSecurity />
      },
      {
        path: "sharing",
        element: <SettingsSharing />,
        children: [
          {
            index: true,
            path: "by-password",
            element: <SettingsSharingByPassword />
          },
          {
            path: "by-user",
            element: <SettingsSharingByUser />
          },
        ]
      },
      {
        path: "device-management",
        element: <SettingsDeviceManagement />
      },
    ]
  },
  {
    path: "/settings-device-management",
    element: <SettingsDeviceManagement />
  },
  {
    path: "/settings-security",
    element: <SettingsSecurity />
  },
  {
    path: "/settings-personal-info",
    element: <SettingsPersonalInfo />
  },
  {
    path: "/import",
    element: <Import />
  },
  {
    path: "/help-and-support",
    element: <HelpSupport />
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
