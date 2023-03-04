import Navbar from "../components/Navbar";
import SettingsPanel from "../components/SettingsPanel";
import SearchInputBox from "../components/SearchInputBox";
import Button from "../components/Button";
import DeviceCard from "../components/DeviceCard";
import "./SettingsDeviceManagement.css";

const SettingsDeviceManagement = () => {
  return (
    <div className="settings-device-management">
      <Navbar navbarType="app"/>
      <div className="apphomeinner1">
        <SettingsPanel activePanel="Device Management" />
        <div className="rightpanel">
          <SearchInputBox />
          <Button
            label="Sync new device"
            buttonDerivativeBaseOverflow="unset"
            iconXSmall="../iconxsmall27@2x.png"
          />
          <DeviceCard
            icon="../icon@2x.png"
            appLabel="Home McBook"
            username="Delhi"
          />
          <DeviceCard
            cardHeight="206.25px"
            cardFlexShrink="0"
            icon="../icon1@2x.png"
            appLabel="Samsung Smartphone"
            username="Noida"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsDeviceManagement;
