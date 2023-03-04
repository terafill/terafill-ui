import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RecoveryKit from "./pages/RecoveryKit";
import HelpSupport from "./pages/HelpSupport";
import SettingsDeviceManagement from "./pages/SettingsDeviceManagement";
import AppHome from "./pages/AppHome";
import EmailConfirmation from "./pages/EmailConfirmation";
import Import from "./pages/Import";
import SettingsSharingByUser from "./pages/SettingsSharingByUser";
import SettingsSharingByPassword from "./pages/SettingsSharingByPassword";
import SettingsSecurity from "./pages/SettingsSecurity";
import SettingsPersonalInfo from "./pages/SettingsPersonalInfo";
import CreatePassword from "./pages/CreatePassword";
import SignUpPage from "./pages/SignUpPage";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/recovery-kit":
        title = "";
        metaDescription = "";
        break;
      case "/help-and-support":
        title = "";
        metaDescription = "";
        break;
      case "/settings-device-management":
        title = "";
        metaDescription = "";
        break;
      case "/app-home":
        title = "";
        metaDescription = "";
        break;
      case "/email-confirmation":
        title = "";
        metaDescription = "";
        break;
      case "/import":
        title = "";
        metaDescription = "";
        break;
      case "/settings-sharing-by-user":
        title = "";
        metaDescription = "";
        break;
      case "/settings-sharing-by-password":
        title = "";
        metaDescription = "";
        break;
      case "/settings-security":
        title = "";
        metaDescription = "";
        break;
      case "/settings-personal-info":
        title = "";
        metaDescription = "";
        break;
      case "/create-password":
        title = "";
        metaDescription = "";
        break;
      case "/signup-page":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/recovery-kit" element={<RecoveryKit />} />

      <Route path="/help-and-support" element={<HelpSupport />} />

      <Route
        path="/settings-device-management"
        element={<SettingsDeviceManagement />}
      />

      <Route path="/app-home" element={<AppHome />} />

      <Route path="/email-confirmation" element={<EmailConfirmation />} />

      <Route path="/import" element={<Import />} />

      <Route
        path="/settings-sharing-by-user"
        element={<SettingsSharingByUser />}
      />

      <Route
        path="/settings-sharing-by-password"
        element={<SettingsSharingByPassword />}
      />

      <Route path="/settings-security" element={<SettingsSecurity />} />

      <Route path="/settings-personal-info" element={<SettingsPersonalInfo />} />

      <Route path="/create-password" element={<CreatePassword />} />

      <Route path="/signup-page" element={<SignUpPage />} />
    </Routes>
  );
}
export default App;
