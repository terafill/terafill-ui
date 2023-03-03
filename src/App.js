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
      case "/helpsupport":
        title = "";
        metaDescription = "";
        break;
      case "/settingsdevice-management":
        title = "";
        metaDescription = "";
        break;
      case "/apphome":
        title = "";
        metaDescription = "";
        break;
      case "/emailconfirmation":
        title = "";
        metaDescription = "";
        break;
      case "/import":
        title = "";
        metaDescription = "";
        break;
      case "/settingssharingbyuser":
        title = "";
        metaDescription = "";
        break;
      case "/settingssharingbypassword":
        title = "";
        metaDescription = "";
        break;
      case "/settingssecurity":
        title = "";
        metaDescription = "";
        break;
      case "/settingspersonal-info":
        title = "";
        metaDescription = "";
        break;
      case "/create-password":
        title = "";
        metaDescription = "";
        break;
      case "/signuppage":
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

      <Route path="/helpsupport" element={<HelpSupport />} />

      <Route
        path="/settingsdevice-management"
        element={<SettingsDeviceManagement />}
      />

      <Route path="/apphome" element={<AppHome />} />

      <Route path="/emailconfirmation" element={<EmailConfirmation />} />

      <Route path="/import" element={<Import />} />

      <Route
        path="/settingssharingbyuser"
        element={<SettingsSharingByUser />}
      />

      <Route
        path="/settingssharingbypassword"
        element={<SettingsSharingByPassword />}
      />

      <Route path="/settingssecurity" element={<SettingsSecurity />} />

      <Route path="/settingspersonal-info" element={<SettingsPersonalInfo />} />

      <Route path="/create-password" element={<CreatePassword />} />

      <Route path="/signuppage" element={<SignUpPage />} />
    </Routes>
  );
}
export default App;
