import Navbar4 from "../components/Navbar4";
import SettingsPanel from "../components/SettingsPanel";
import SecurityCard from "../components/SecurityCard";
import SecurityCard2 from "../components/SecurityCard2";
import "./SettingsSecurity.css";

const SettingsSecurity = () => {
  return (
    <div className="settings-security">
      <Navbar4 />
      <div className="apphomeinner6">
        <SettingsPanel activePanel="Security" />
        <div className="rightpanel4">
          <SecurityCard />
          <SecurityCard2 />
        </div>
      </div>
    </div>
  );
};

export default SettingsSecurity;
